"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const wrapRef     = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);

  const sceneRef    = useRef<THREE.Scene | null>(null);
  const cameraRef   = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const globeRef    = useRef<THREE.Group | null>(null);
  const wireRef     = useRef<THREE.Mesh | null>(null);
  const atmoRef     = useRef<THREE.Mesh | null>(null);
  const anchorsRef  = useRef<THREE.Object3D[]>([]);
  const rafRef      = useRef<number>(0);

  const [loaded,       setLoaded]       = useState(false);
  const [autoRotate,   setAutoRotate]   = useState(true);
  const [wireframe,    setWireframe]    = useState(false);
  const [atmosphere,   setAtmosphere]   = useState(true);
  const [markers,      setMarkers]      = useState<MarkerState[]>(() =>
    COUNTRIES.map((c) => ({ country: c, x: 0, y: 0, behind: true }))
  );
  const [latText, setLatText] = useState("0.0°");
  const [lngText, setLngText] = useState("0.0°");
  const [fps,     setFps]     = useState<number | null>(null);

  // ── init Three.js scene ────────────────────────────────────────────────
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
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.set(0, 0.6, RADIUS * 3.4);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping  = true;
    controls.dampingFactor  = 0.08;
    controls.enablePan      = false;
    controls.rotateSpeed    = 0.45;
    controls.minDistance    = RADIUS * 1.6;
    controls.maxDistance    = RADIUS * 6;
    controls.autoRotate     = true;
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

    // globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeRef.current = globeGroup;

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS, 96, 96),
      new THREE.MeshStandardMaterial({
        map: earthTex,
        bumpMap: bumpTex,
        bumpScale: 0.04,
        roughness: 0.85,
        metalness: 0.0,
      })
    );
    globeGroup.add(globe);

    // wireframe overlay
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.003, 48, 24),
      new THREE.MeshBasicMaterial({
        color: 0x6aa9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      })
    );
    wire.visible = false;
    globeGroup.add(wire);
    wireRef.current = wire;

    // atmosphere (Fresnel shell)
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor:     { value: new THREE.Color(0x4da6ff) },
        uIntensity: { value: 0.9 },
        uPower:     { value: 2.6 },
      },
      vertexShader: `
        varying vec3 vN;
        varying vec3 vP;
        void main(){
          vN = normalize(normalMatrix * normal);
          vP = (modelViewMatrix * vec4(position,1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIntensity;
        uniform float uPower;
        varying vec3 vN;
        varying vec3 vP;
        void main(){
          float f = pow(1.0 - abs(dot(vN, normalize(-vP))), uPower);
          gl_FragColor = vec4(uColor, f * uIntensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(RADIUS * 1.14, 64, 32),
      atmoMat
    );
    scene.add(atmo);
    atmoRef.current = atmo;

    // starfield
    const starGeo = new THREE.BufferGeometry();
    const N = 1200;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 60 + Math.random() * 40;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(p) * Math.cos(t);
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      pos[i * 3 + 2] = r * Math.cos(p);
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      size: 0.06, color: 0xffffff, transparent: true, opacity: 0.55, sizeAttenuation: true,
    })));

    // marker anchors (3D objects that rotate with the globe)
    const anchors: THREE.Object3D[] = COUNTRIES.map((c) => {
      const anchor = new THREE.Object3D();
      anchor.position.copy(latLngToVec3(c.lat, c.lng, RADIUS * 1.005));
      globeGroup.add(anchor);
      return anchor;
    });
    anchorsRef.current = anchors;

    // ── resize ────────────────────────────────────────────────────────────
    const resize = () => {
      if (!wrap || !renderer || !camera) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ── render loop ────────────────────────────────────────────────────────
    const camPos   = new THREE.Vector3();
    const projected = new THREE.Vector3();
    let lastT = performance.now();
    let fpsAccum = 0;
    let fpsN = 0;

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);
      controls.update();

      camera.getWorldPosition(camPos);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      setMarkers(COUNTRIES.map((c, i) => {
        const anchor = anchors[i];
        anchor.getWorldPosition(projected);

        const normal = projected.clone().normalize();
        const toCam  = camPos.clone().normalize();
        const facing = normal.dot(toCam);

        const p = projected.clone().project(camera);
        const x = (p.x * 0.5 + 0.5) * w;
        const y = (1 - (p.y * 0.5 + 0.5)) * h;
        const behind = facing < 0.05 || p.z > 1;

        return { country: c, x, y, behind };
      }));

      // camera readout
      const dir = camera.position.clone().normalize();
      const lat = Math.asin(dir.y) * (180 / Math.PI);
      const lng = Math.atan2(dir.x, dir.z) * (180 / Math.PI);
      setLatText(lat.toFixed(1) + "°");
      setLngText(lng.toFixed(1) + "°");

      // fps
      const dt = now - lastT;
      lastT = now;
      if (dt > 0) {
        fpsAccum += 1000 / dt;
        fpsN++;
        if (fpsN >= 20) {
          setFps(Math.round(fpsAccum / fpsN));
          fpsAccum = 0;
          fpsN = 0;
        }
      }

      renderer.render(scene, camera);
    };
    rafRef.current = requestAnimationFrame(tick);

    // fallback: hide loading after 6 s
    const timeout = setTimeout(() => setLoaded(true), 6000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      clearTimeout(timeout);
      renderer.dispose();
      sceneRef.current    = null;
      cameraRef.current   = null;
      rendererRef.current = null;
      controlsRef.current = null;
      globeRef.current    = null;
      wireRef.current     = null;
      atmoRef.current     = null;
    };
  }, []);

  // ── toggle handlers ─────────────────────────────────────────────────────
  const toggleRotate = useCallback(() => {
    setAutoRotate((prev) => {
      const next = !prev;
      if (controlsRef.current) controlsRef.current.autoRotate = next;
      return next;
    });
  }, []);

  const toggleWire = useCallback(() => {
    setWireframe((prev) => {
      const next = !prev;
      if (wireRef.current) wireRef.current.visible = next;
      return next;
    });
  }, []);

  const toggleAtmo = useCallback(() => {
    setAtmosphere((prev) => {
      const next = !prev;
      if (atmoRef.current) atmoRef.current.visible = next;
      return next;
    });
  }, []);

  const recenter = useCallback(() => {
    const camera  = cameraRef.current;
    const globe   = globeRef.current;
    const controls = controlsRef.current;
    if (!camera || !globe || !controls) return;

    const startPos = camera.position.clone();
    const endPos   = new THREE.Vector3(0, 0.6, RADIUS * 3.4);
    const startQ   = globe.quaternion.clone();
    const endQ     = new THREE.Quaternion();
    const t0 = performance.now();
    const dur = 700;

    const step = () => {
      const k     = Math.min(1, (performance.now() - t0) / dur);
      const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      camera.position.lerpVectors(startPos, endPos, eased);
      globe.quaternion.copy(startQ).slerp(endQ, eased);
      controls.target.set(0, 0, 0);
      if (k < 1) requestAnimationFrame(step);
    };
    step();
  }, []);

  const focusMarker = useCallback((index: number) => {
    const camera  = cameraRef.current;
    const globe   = globeRef.current;
    const controls = controlsRef.current;
    const anchor  = anchorsRef.current[index];
    if (!camera || !globe || !controls || !anchor) return;

    const target  = anchor.getWorldPosition(new THREE.Vector3()).normalize();
    const camDir  = camera.position.clone().normalize();
    const q       = new THREE.Quaternion().setFromUnitVectors(target, camDir);
    const startQ  = globe.quaternion.clone();
    const endQ    = q.clone().multiply(startQ);
    const t0 = performance.now();
    const dur = 900;

    setAutoRotate(false);
    if (controls) controls.autoRotate = false;

    const step = () => {
      const k     = Math.min(1, (performance.now() - t0) / dur);
      const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      globe.quaternion.copy(startQ).slerp(endQ, eased);
      if (k < 1) requestAnimationFrame(step);
    };
    step();
  }, []);

  return (
    <section className={styles.section}>
      {/* top bar */}
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.brandDot} />
          <span>Atlas&nbsp;/&nbsp;Live Globe</span>
        </div>
        <div className={styles.meta}>
          <span>LAT&nbsp;<b>{latText}</b></span>
          <span>LNG&nbsp;<b>{lngText}</b></span>
          <span>FPS&nbsp;<b>{fps ?? "—"}</b></span>
        </div>
      </header>

      {/* canvas area */}
      <div className={styles.canvasWrap} ref={wrapRef}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* HTML marker overlays */}
        <div className={styles.markersLayer}>
          {markers.map((m, i) => (
            <div
              key={m.country.code}
              className={`${styles.marker} ${m.behind ? styles.markerBehind : ""}`}
              style={{ transform: `translate(${m.x}px, ${m.y}px) translate(-50%, -100%)` }}
            >
              <div className={styles.chip} onClick={() => focusMarker(i)}>
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

        {/* side panel */}
        <aside className={styles.sidePanel}>
          <h3 className={styles.sidePanelTitle}>Active Locations</h3>
          <div className={styles.count}>
            {COUNTRIES.length}<span>/{COUNTRIES.length}</span>
          </div>
          <ul className={styles.locationList}>
            {COUNTRIES.map((c, i) => (
              <li key={c.code} className={styles.locationItem} onClick={() => focusMarker(i)}>
                <span className={styles.locationDot} />
                <span className={styles.locationName}>{c.city}</span>
                <span className={styles.locationCode}>{c.code}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* loading overlay */}
        {!loaded && (
          <div className={styles.loading}>
            <span className={styles.loadingDot} />
            Loading textures
          </div>
        )}
      </div>

      {/* bottom bar */}
      <footer className={styles.bottomBar}>
        <span className={styles.hint}>Drag to rotate · scroll to zoom</span>
        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${autoRotate ? styles.btnActive : ""}`}
            onClick={toggleRotate}
          >
            Auto-rotate
          </button>
          <button
            className={`${styles.btn} ${wireframe ? styles.btnActive : ""}`}
            onClick={toggleWire}
          >
            Wireframe
          </button>
          <button
            className={`${styles.btn} ${atmosphere ? styles.btnActive : ""}`}
            onClick={toggleAtmo}
          >
            Atmosphere
          </button>
          <button className={styles.btn} onClick={recenter}>
            Recenter
          </button>
        </div>
        <span className={styles.hint}>v0.1 · prototype</span>
      </footer>
    </section>
  );
}
