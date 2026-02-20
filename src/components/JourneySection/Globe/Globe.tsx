"use client";

import React, { useEffect, useRef } from 'react';
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

interface GlobeProps {
  className?: string;
  rotation?: number;
  mode?: 'day' | 'night';
  showOrbits?: boolean;
  autoRotate?: boolean;
}

export default function Globe({ 
  className, 
  rotation = 0, 
  mode = 'night', 
  showOrbits = true,
  autoRotate = false
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const requestRef = useRef<number>(0);
  const globeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y = rotation * Math.PI * 1.5;
    }
  }, [rotation]);

  useEffect(() => {
    if (!containerRef.current) return;

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

      const dayStrength = sunOrientation.smoothstep(-0.25, 0.5);

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
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      
      rendererRef.current = renderer;
      containerRef.current!.appendChild(renderer.domElement);

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
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current && rendererRef.current.dispose) rendererRef.current.dispose();
      if (containerRef.current && rendererRef.current && rendererRef.current.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [mode, showOrbits, autoRotate]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
