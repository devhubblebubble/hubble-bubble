"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./AtlasGlobeEmbed.module.scss";

const MARKERS = [
  { code: "JP", city: "Tokyo",        name: "Japan",          lat: 35.6762,  lng: 139.6503 },
  { code: "US", city: "New York",     name: "United States",  lat: 40.7128,  lng: -74.006  },
  { code: "GB", city: "London",       name: "United Kingdom", lat: 51.5074,  lng: -0.1278  },
  { code: "DE", city: "Berlin",       name: "Germany",        lat: 52.52,    lng: 13.405   },
  { code: "AU", city: "Sydney",       name: "Australia",      lat: -33.8688, lng: 151.2093 },
  { code: "IN", city: "Mumbai",       name: "India",          lat: 19.076,   lng: 72.8777  },
  { code: "SG", city: "Singapore",    name: "Singapore",      lat: 1.3521,   lng: 103.8198 },
  { code: "FR", city: "Paris",        name: "France",         lat: 48.8566,  lng: 2.3522   },
  { code: "ZA", city: "Cape Town",    name: "South Africa",   lat: -33.9249, lng: 18.4241  },
  { code: "BR", city: "São Paulo",    name: "Brazil",         lat: -23.5505, lng: -46.6333 },
  { code: "EG", city: "Cairo",        name: "Egypt",          lat: 30.0444,  lng: 31.2357  },
  { code: "KR", city: "Seoul",        name: "South Korea",    lat: 37.5665,  lng: 126.978  },
];

const RADIUS = 2;

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

type MarkerUI = { code: string; city: string; name: string; x: number; y: number; behind: boolean };

interface Props {
  rotation?: number;   // 0–1, drives globe Y rotation
  className?: string;
}

export default function AtlasGlobeEmbed({ rotation = 0, className }: Props) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef  = useRef<THREE.Group | null>(null);
  const rafRef    = useRef<number>(0);
  const rotRef    = useRef(rotation);

  const [markerUIs, setMarkerUIs] = useState<MarkerUI[]>([]);

  // keep rotRef in sync without re-running the effect
  useEffect(() => { rotRef.current = rotation; }, [rotation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 0, RADIUS * 3.8);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xfffaf0, 1.4);
    sun.position.set(8, 4, 6);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x88aaff, 0.35);
    fill.position.set(-6, 2, -4);
    scene.add(fill);

    const loader   = new THREE.TextureLoader();
    const earthTex = loader.load("https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg");
    earthTex.colorSpace = THREE.SRGBColorSpace;
    earthTex.anisotropy = 8;
    const bumpTex = loader.load("https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png");
    bumpTex.anisotropy = 4;

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeRef.current = globeGroup;

    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 96, 96),
      new THREE.MeshStandardMaterial({ map: earthTex, bumpMap: bumpTex, bumpScale: 0.04, roughness: 0.85, metalness: 0 }),
    ));

    const anchors = MARKERS.map((m) => {
      const a = new THREE.Object3D();
      a.position.copy(latLngToVec3(m.lat, m.lng, RADIUS * 1.005));
      globeGroup.add(a);
      return a;
    });

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const camPos    = new THREE.Vector3();
    const projected = new THREE.Vector3();

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      globeGroup.rotation.y = rotRef.current * Math.PI * 1.6;

      camera.getWorldPosition(camPos);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      setMarkerUIs(anchors.map((anchor, i) => {
        anchor.getWorldPosition(projected);
        const facing = projected.clone().normalize().dot(camPos.clone().normalize());
        const p = projected.clone().project(camera);
        return {
          ...MARKERS[i],
          x:      (p.x * 0.5 + 0.5) * w,
          y:      (1 - (p.y * 0.5 + 0.5)) * h,
          behind: facing < 0.05 || p.z > 1,
        };
      }));

      renderer.render(scene, camera);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`${styles.wrap} ${className ?? ""}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.markers}>
        {markerUIs.map((m) => m.behind ? null : (
          <div
            key={m.code}
            className={styles.marker}
            style={{ transform: `translate(${m.x}px, ${m.y}px) translate(-50%, -100%)` }}
          >
            <div className={styles.chip}>
              <span className={styles.avatar}>{m.code}</span>
              <span className={styles.chipText}>
                {m.city}
                <small>{m.name.toUpperCase()}</small>
              </span>
            </div>
            <div className={styles.stem} />
            <div className={styles.pin} />
          </div>
        ))}
      </div>
    </div>
  );
}
