"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three/webgpu';
import { 
  step, 
  normalWorldGeometry, 
  output, 
  texture, 
  vec3, 
  vec4, 
  normalize, 
  positionWorld, 
  bumpMap, 
  cameraPosition, 
  color, 
  uniform, 
  mix, 
  uv, 
  max 
} from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface HighlightCountry {
  iso3?: string;
  countryCode?: string;
  country?: string;
  countryName?: string;
  value?: number;
}

interface GlobeProps {
  className?: string;
  rotation?: number;
  mode?: 'day' | 'night';
  showOrbits?: boolean;
  autoRotate?: boolean;
  highlightCountries?: HighlightCountry[];
}

interface GeoFeature {
  id?: string;
  properties?: { name?: string };
  geometry?: {
    type?: string;
    coordinates?: unknown;
  };
}

interface GeoJsonCollection {
  features?: GeoFeature[];
}

type Coord = [number, number];
type Ring = Coord[];
type PolygonCoords = Ring[];
type MultiPolygonCoords = PolygonCoords[];

const COUNTRIES_GEOJSON_URL =
  'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json';

const HIGHLIGHT_RADIUS = 1.004;

const normalizeKey = (value: string) => value.trim().toLowerCase();

const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

const createCountryMeshes = (
  feature: GeoFeature,
  material: THREE.Material
): THREE.Object3D[] => {
  if (!feature.geometry?.type || !feature.geometry.coordinates) return [];
  const meshes: THREE.Object3D[] = [];

  const polygons =
    feature.geometry.type === 'Polygon'
      ? [feature.geometry.coordinates as PolygonCoords]
      : feature.geometry.type === 'MultiPolygon'
      ? (feature.geometry.coordinates as MultiPolygonCoords)
      : [];

  polygons.forEach((polygonCoords) => {
    if (!Array.isArray(polygonCoords) || !polygonCoords.length) return;
    const outerRing = polygonCoords[0];
    if (!Array.isArray(outerRing) || outerRing.length < 3) return;

    const shape = new THREE.Shape(
      outerRing.map(
        ([lng, lat]: [number, number]) => new THREE.Vector2(lng, lat)
      )
    );

    polygonCoords.slice(1).forEach((holeRing) => {
      if (!Array.isArray(holeRing) || holeRing.length < 3) return;
      const holePath = new THREE.Path(
        holeRing.map(
          ([lng, lat]: [number, number]) => new THREE.Vector2(lng, lat)
        )
      );
      shape.holes.push(holePath);
    });

    const geometry2d = new THREE.ShapeGeometry(shape);
    const pos = geometry2d.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const lng = pos.getX(i);
      const lat = pos.getY(i);
      const v3 = latLngToVector3(lat, lng, HIGHLIGHT_RADIUS);
      pos.setXYZ(i, v3.x, v3.y, v3.z);
    }
    geometry2d.computeVertexNormals();

    const fillMesh = new THREE.Mesh(geometry2d, material);
    fillMesh.renderOrder = 5;
    meshes.push(fillMesh);
  });

  return meshes;
};

export default function Globe({ 
  className, 
  rotation = 0, 
  mode = 'night', 
  showOrbits = true,
  autoRotate = false,
  highlightCountries = []
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const requestRef = useRef<number>(0);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const countriesRef = useRef<GeoJsonCollection | null>(null);
  const highlightGroupRef = useRef<THREE.Group | null>(null);
  const [countriesVersion, setCountriesVersion] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const loadCountries = async () => {
      try {
        const response = await fetch(COUNTRIES_GEOJSON_URL, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const geo = (await response.json()) as GeoJsonCollection;
        if (!cancelled) {
          countriesRef.current = geo;
          setCountriesVersion((v) => v + 1);
        }
      } catch {
        // Keep globe alive even if geojson fetch fails.
      }
    };
    void loadCountries();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!highlightGroupRef.current || !countriesRef.current?.features) return;

    const group = highlightGroupRef.current;
    while (group.children.length) {
      const child = group.children[0];
      group.remove(child);
      const disposable = child as unknown as {
        geometry?: { dispose?: () => void };
        material?: THREE.Material | THREE.Material[];
      };
      disposable.geometry?.dispose?.();
      if (Array.isArray(disposable.material)) {
        disposable.material.forEach((m) => m?.dispose?.());
      } else {
        disposable.material?.dispose?.();
      }
    }

    const valueMap = new Map<string, number>();
    for (const item of highlightCountries) {
      const value = Math.max(0, item.value ?? 0);
      const keys = [
        item.iso3,
        item.countryCode,
        item.country,
        item.countryName,
      ].filter(Boolean) as string[];
      keys.forEach((key) => valueMap.set(normalizeKey(key), value));
    }

    const values = Array.from(valueMap.values());
    const maxValue = values.length ? Math.max(...values) : 1;

    countriesRef.current.features.forEach((feature) => {
      const iso = feature.id ? normalizeKey(feature.id) : '';
      const name = feature.properties?.name
        ? normalizeKey(feature.properties.name)
        : '';
      const value = valueMap.get(iso) ?? valueMap.get(name);
      if (!value) return;

      const ratio = Math.min(1, value / maxValue);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(1, 0.45 + ratio * 0.15, 0.22),
        transparent: true,
        opacity: 0.52 + ratio * 0.2,
        depthWrite: false,
        premultipliedAlpha: true,
      });

      createCountryMeshes(feature, material).forEach((mesh) => group.add(mesh));
    });
  }, [highlightCountries, countriesVersion]);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y = rotation * Math.PI * 1.5;
    }
  }, [rotation]);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let camera: THREE.PerspectiveCamera, 
        scene: THREE.Scene, 
        renderer: any, 
        controls: any, 
        globe: THREE.Mesh, 
        clock: THREE.Clock;

    const init = async () => {
      clock = new THREE.Clock();

      camera = new THREE.PerspectiveCamera(25, containerRef.current!.clientWidth / containerRef.current!.clientHeight, 0.1, 100);
      camera.position.set(4.5, 2, 3);

      scene = new THREE.Scene();

      const sun = new THREE.DirectionalLight('#ffffff', 2);
      sun.position.set(0, 0, 3);
      scene.add(sun);

      const atmosphereDayColor = uniform(color('#4db2ff'));
      const atmosphereTwilightColor = uniform(color('#bc490b'));
      const roughnessLow = uniform(0.25);
      const roughnessHigh = uniform(0.35);

      const textureLoader = new THREE.TextureLoader();

      const dayTexture = textureLoader.load('/textures/planets/earth_day_2048.webp');
      dayTexture.colorSpace = THREE.SRGBColorSpace;
      dayTexture.anisotropy = 8;

      const nightTexture = textureLoader.load('/textures/planets/earth_night_2048.webp');
      nightTexture.colorSpace = THREE.SRGBColorSpace;
      nightTexture.anisotropy = 8;

      const bumpRoughnessCloudsTexture = textureLoader.load('/textures/planets/earth_bump_roughness_clouds_2048.webp');
      bumpRoughnessCloudsTexture.anisotropy = 8;

      const viewDirection = positionWorld.sub(cameraPosition).normalize();
      const fresnel = viewDirection.dot(normalWorldGeometry).abs().oneMinus().toVar();

      const sunOrientation = normalWorldGeometry.dot(normalize(sun.position)).toVar();

      const atmosphereColor = mix(atmosphereTwilightColor, atmosphereDayColor, sunOrientation.smoothstep(-0.25, 0.75));

      const globeMaterial = new THREE.MeshStandardNodeMaterial();

      const cloudsStrength = texture(bumpRoughnessCloudsTexture, uv()).b.smoothstep(0.2, 1);

      globeMaterial.colorNode = mix(texture(dayTexture), vec3(1), cloudsStrength.mul(2));

      const roughness = max(
        texture(bumpRoughnessCloudsTexture, uv()).g,
        step(0.01, cloudsStrength)
      );

      globeMaterial.roughnessNode = roughness.remap(0, 1, roughnessLow, roughnessHigh);

      const night = texture(nightTexture);

      const dayStrength = mode === 'day'
        ? uniform(1)
        : sunOrientation.smoothstep(-0.25, 0.5);

      const atmosphereDayStrength = sunOrientation.smoothstep(-0.5, 1);

      const atmosphereMix = atmosphereDayStrength.mul(fresnel.pow(2)).clamp(0, 1);

      let finalOutput = mix(night.rgb, output.rgb, dayStrength);

      finalOutput = mix(finalOutput, atmosphereColor, atmosphereMix);

      globeMaterial.outputNode = vec4(finalOutput, output.a);

      const bumpElevation = max(
        texture(bumpRoughnessCloudsTexture, uv()).r,
        cloudsStrength
      );

      globeMaterial.normalNode = bumpMap(bumpElevation);

      const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

      globe = new THREE.Mesh(sphereGeometry, globeMaterial);
      globeRef.current = globe;
      scene.add(globe);

      const highlightGroup = new THREE.Group();
      highlightGroupRef.current = highlightGroup;
      globe.add(highlightGroup);

      const atmosphereMaterial = new THREE.MeshBasicNodeMaterial({ side: THREE.BackSide, transparent: true });

      let alpha: any = fresnel.remap(0.73, 1, 1, 0).pow(3);
      alpha = alpha.mul(sunOrientation.smoothstep(-0.5, 1));

      atmosphereMaterial.outputNode = vec4(atmosphereColor, alpha);

      const atmosphere = new THREE.Mesh(sphereGeometry, atmosphereMaterial);
      atmosphere.scale.setScalar(1.04);
      scene.add(atmosphere);

      if (showOrbits) {
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x888888,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
          depthWrite: false
        });

        const ringDistances = [1.15, 1.25, 1.35, 1.45];
        const ringThickness = 0.002;

        ringDistances.forEach((distance, index) => {
          const ringGeometry = new THREE.TorusGeometry(distance, ringThickness, 16, 100);
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);

          if (index % 2 === 0) {
            ring.rotation.x = Math.PI / 2;
          } else {
            ring.rotation.x = Math.PI / 2;
            ring.rotation.z = Math.PI / 4;
          }

          scene.add(ring);
        });
      }

      renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
      await renderer.init();
      if (cancelled) {
        renderer.dispose?.();
        return;
      }
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      
      rendererRef.current = renderer;
      if (
        containerRef.current &&
        renderer.domElement.parentElement !== containerRef.current
      ) {
        containerRef.current.appendChild(renderer.domElement);
      }

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enabled = false;
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.minDistance = 2.5;
      controls.maxDistance = 8;
      controls.enablePan = false;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1;

      const animate = () => {
        requestRef.current = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (autoRotate && globe) globe.rotation.y += delta * 0.025;
        if (controls) controls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
      };

      animate();
    };

    init();

    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (highlightGroupRef.current) {
        while (highlightGroupRef.current.children.length) {
          const child = highlightGroupRef.current.children[0];
          highlightGroupRef.current.remove(child);
          const disposable = child as unknown as {
            geometry?: { dispose?: () => void };
            material?: THREE.Material | THREE.Material[];
          };
          disposable.geometry?.dispose?.();
          if (Array.isArray(disposable.material)) {
            disposable.material.forEach((m) => m?.dispose?.());
          } else {
            disposable.material?.dispose?.();
          }
        }
      }
      if (rendererRef.current && rendererRef.current.dispose) rendererRef.current.dispose();
      if (containerRef.current && rendererRef.current && rendererRef.current.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current = null;
    };
  }, [mode, showOrbits, autoRotate]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
