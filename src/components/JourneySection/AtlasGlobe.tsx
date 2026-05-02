"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import styles from "./AtlasGlobe.module.scss";

const COUNTRIES = [
  { name: "Japan",         code: "JP", city: "Tokyo",        lat: 35.6762,  lng: 139.6503 },
  { name: "United States", code: "US", city: "New York",     lat: 40.7128,  lng: -74.006 },
  { name: "Brazil",        code: "BR", city: "São Paulo",    lat: -23.5505, lng: -46.6333 },
  { name: "United Kingdom",code: "GB", city: "London",       lat: 51.5074,  lng: -0.1278 },
  { name: "Germany",       code: "DE", city: "Berlin",       lat: 52.52,    lng: 13.405 },
  { name: "South Africa",  code: "ZA", city: "Cape Town",    lat: -33.9249, lng: 18.4241 },
  { name: "Australia",     code: "AU", city: "Sydney",       lat: -33.8688, lng: 151.2093 },
  { name: "India",         code: "IN", city: "Mumbai",       lat: 19.076,   lng: 72.8777 },
  { name: "Singapore",     code: "SG", city: "Singapore",    lat: 1.3521,   lng: 103.8198 },
  { name: "France",        code: "FR", city: "Paris",        lat: 48.8566,  lng: 2.3522 },
  { name: "Mexico",        code: "MX", city: "Mexico City",  lat: 19.4326,  lng: -99.1332 },
  { name: "Egypt",         code: "EG", city: "Cairo",        lat: 30.0444,  lng: 31.2357 },
  { name: "Iceland",       code: "IS", city: "Reykjavík",    lat: 64.1466,  lng: -21.9426 },
  { name: "Argentina",     code: "AR", city: "Buenos Aires", lat: -34.6037, lng: -58.3816 },
  { name: "South Korea",   code: "KR", city: "Seoul",        lat: 37.5665,  lng: 126.978 },
];

const TEX_EARTH = "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const TEX_BUMP  = "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";
const RADIUS = 2;

type MarkerState = {
  country: (typeof COUNTRIES)[number];
  x: number;
  y: number;
  behind: boolean;
};

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export default function AtlasGlobe() {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  const cameraRef   = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef    = useRef<THREE.Group | null>(null);
  const anchorsRef  = useRef<THREE.Object3D[]>([]);
  const rafRef      = useRef<number>(0);

  const [loaded,  setLoaded]  = useState(false);
  const [markers, setMarkers] = useState<MarkerState[]>(() =>
    COUNTRIES.map((c) => ({ country: c, x: 0, y: 0, behind: true }))
  );
  const [fps, setFps] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 0.6, RADIUS * 3.4);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping   = true;
    controls.dampingFactor   = 0.08;
    controls.enablePan       = false;
    controls.rotateSpeed     = 0.45;
    controls.minDistance     = RADIUS * 1.6;
    controls.maxDistance     = RADIUS * 6;
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.35;
    controlsRef.current = controls;

    // lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(8, 4, 6);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x88aaff, 0.35);
    fill.position.set(-6, 2, -4);
    scene.add(fill);

    // textures
    const loader = new THREE.TextureLoader();
    let loadedCount = 0;
    const onLoad = () => { loadedCount++; if (loadedCount >= 2) setLoaded(true); };

    const earthTex = loader.load(TEX_EARTH, onLoad);
    earthTex.colorSpace = THREE.SRGBColorSpace;
    earthTex.anisotropy = 8;
    const bumpTex = loader.load(TEX_BUMP, onLoad);
    bumpTex.anisotropy = 4;

    // globe
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeRef.current = globeGroup;

    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 96, 96),
      new THREE.MeshStandardMaterial({
        map: earthTex, bumpMap: bumpTex, bumpScale: 0.04, roughness: 0.85, metalness: 0.0,
      })
    ));


    // marker anchors
    const anchors: THREE.Object3D[] = COUNTRIES.map((c) => {
      const anchor = new THREE.Object3D();
      anchor.position.copy(latLngToVec3(c.lat, c.lng, RADIUS * 1.005));
      globeGroup.add(anchor);
      return anchor;
    });
    anchorsRef.current = anchors;

    // resize
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

    // render loop
    const camPos    = new THREE.Vector3();
    const projected = new THREE.Vector3();
    let lastT = performance.now();
    let fpsAccum = 0, fpsN = 0;

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      controls.update();

      camera.getWorldPosition(camPos);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      setMarkers(COUNTRIES.map((c, i) => {
        anchors[i].getWorldPosition(projected);
        const facing = projected.clone().normalize().dot(camPos.clone().normalize());
        const p = projected.clone().project(camera);
        return {
          country: c,
          x: (p.x * 0.5 + 0.5) * w,
          y: (1 - (p.y * 0.5 + 0.5)) * h,
          behind: facing < 0.05 || p.z > 1,
        };
      }));

      const dt = now - lastT;
      lastT = now;
      if (dt > 0) {
        fpsAccum += 1000 / dt;
        fpsN++;
        if (fpsN >= 20) {
          setFps(Math.round(fpsAccum / fpsN));
          fpsAccum = 0; fpsN = 0;
        }
      }

      renderer.render(scene, camera);
    };
    rafRef.current = requestAnimationFrame(tick);

    const timeout = setTimeout(() => setLoaded(true), 6000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      clearTimeout(timeout);
      renderer.dispose();
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.canvasWrap} ref={wrapRef}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* markers */}
        <div className={styles.markersLayer}>
          {markers.map((m, i) => (
            <div
              key={m.country.code}
              className={`${styles.marker} ${m.behind ? styles.markerBehind : ""}`}
              style={{ transform: `translate(${m.x}px, ${m.y}px) translate(-50%, -100%)` }}
            >
              <div className={styles.chip}>
                <div className={styles.avatar}>{m.country.code}</div>
                <div className={styles.chipText}>
                  {m.country.city}
                  <small>{m.country.name.toUpperCase()}</small>
                </div>
              </div>
              <div className={styles.stem} />
              <div className={styles.pin} />
            </div>
          ))}
        </div>

        {/* active locations count */}
        <aside className={styles.sidePanel}>
          <h3 className={styles.sidePanelTitle}>Active Locations</h3>
          <div className={styles.count}>
            {COUNTRIES.length}<span>/{COUNTRIES.length}</span>
          </div>
        </aside>

        {/* fps badge */}
        <div className={styles.fpsBadge}>
          FPS&nbsp;<b>{fps ?? "—"}</b>
        </div>

        {!loaded && (
          <div className={styles.loading}>
            <span className={styles.loadingDot} />
            Loading textures
          </div>
        )}
      </div>
    </section>
  );
}
