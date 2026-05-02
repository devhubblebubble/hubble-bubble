"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import styles from "./JourneySectionAtlasGlobe.module.scss";

// ── data ──────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: "01",
    number: "01",
    title: "Your journey starts with the",
    highlight: "real you.",
    description:
      'While other consultants shove random degrees down your Oesophagus, we actually care about who you are. Our Magic-Spell "Revelio" blends your passion, dreams, and skillset into one powerful profile so we can finally understand the complete, complex, amazing human that is you.',
    tags: ["Personality Trait", "Skillset Audit", "Career Blueprint"],
    focus: ["IN", "GB", "SG"],
  },
  {
    id: "02",
    number: "02",
    title: "Find your",
    highlight: "real path.",
    description:
      "No more guessing games. We map your unique profile to the world's best-fit universities and courses. It's not about where everyone is going—it's about where you will thrive, grow, and conquer.",
    tags: ["University Search", "Course Selection", "Application Strategy"],
    focus: ["GB", "US", "DE", "FR", "AU"],
  },
  {
    id: "03",
    number: "03",
    title: "Fuel your",
    highlight: "real growth.",
    description:
      "From visas to pre-departure, we're with you till the very end. But our support doesn't stop at the airport. We provide career guidance and networking to ensure your international journey turns into a lifetime of success.",
    tags: ["Visa Support", "Pre-departure", "Career Guidance"],
    focus: ["JP", "US", "GB", "DE", "AU", "SG", "FR"],
  },
];

const MARKERS = [
  { code: "JP", city: "Tokyo",        name: "Japan",          lat: 35.6762,  lng: 139.6503 },
  { code: "US", city: "New York",     name: "United States",  lat: 40.7128,  lng: -74.006  },
  { code: "BR", city: "São Paulo",    name: "Brazil",         lat: -23.5505, lng: -46.6333 },
  { code: "GB", city: "London",       name: "United Kingdom", lat: 51.5074,  lng: -0.1278  },
  { code: "DE", city: "Berlin",       name: "Germany",        lat: 52.52,    lng: 13.405   },
  { code: "ZA", city: "Cape Town",    name: "South Africa",   lat: -33.9249, lng: 18.4241  },
  { code: "AU", city: "Sydney",       name: "Australia",      lat: -33.8688, lng: 151.2093 },
  { code: "IN", city: "Mumbai",       name: "India",          lat: 19.076,   lng: 72.8777  },
  { code: "SG", city: "Singapore",    name: "Singapore",      lat: 1.3521,   lng: 103.8198 },
  { code: "FR", city: "Paris",        name: "France",         lat: 48.8566,  lng: 2.3522   },
  { code: "MX", city: "Mexico City",  name: "Mexico",         lat: 19.4326,  lng: -99.1332 },
  { code: "EG", city: "Cairo",        name: "Egypt",          lat: 30.0444,  lng: 31.2357  },
  { code: "KR", city: "Seoul",        name: "South Korea",    lat: 37.5665,  lng: 126.978  },
];

const RADIUS    = 2;
const SNAP_VALS = STEPS.map((_, i) => i / (STEPS.length - 1)); // [0, 0.5, 1]
const WHEEL_THRESHOLD = 120; // accumulated deltaY to trigger a step change

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

type MarkerUI = { code: string; x: number; y: number; behind: boolean };

// ── component ─────────────────────────────────────────────────────────────
export default function JourneySectionAtlasGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef      = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  // Three.js refs
  const globeRef    = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef   = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef    = useRef<THREE.Scene | null>(null);
  const anchorsRef  = useRef<THREE.Object3D[]>([]);
  const rafRef      = useRef<number>(0);

  // progress refs — avoid triggering rerenders in the render loop
  const displayProgressRef = useRef(0); // smoothly lerped value read by Three.js tick
  const targetProgressRef  = useRef(0); // snapped target

  // React state
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayProg, setDisplayProg] = useState(0);
  const [animating,   setAnimating]   = useState(false);
  const [markerUIs,   setMarkerUIs]   = useState<MarkerUI[]>([]);

  // ── step navigation ───────────────────────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(STEPS.length - 1, idx));
    targetProgressRef.current = SNAP_VALS[clamped];
    setActiveIndex(clamped);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
  }, []);

  // wheel
  const wheelAccRef = useRef(0);
  const wheelCoolRef = useRef(false);

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (wheelCoolRef.current) return;
    wheelAccRef.current += e.deltaY;
    if (Math.abs(wheelAccRef.current) >= WHEEL_THRESHOLD) {
      const dir = wheelAccRef.current > 0 ? 1 : -1;
      wheelAccRef.current = 0;
      wheelCoolRef.current = true;
      setTimeout(() => { wheelCoolRef.current = false; }, 700);
      setActiveIndex((prev) => {
        const next = Math.max(0, Math.min(STEPS.length - 1, prev + dir));
        targetProgressRef.current = SNAP_VALS[next];
        setAnimating(true);
        setTimeout(() => setAnimating(false), 600);
        return next;
      });
    }
  }, []);

  // touch
  const touchStartY = useRef(0);
  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);
  const onTouchEnd = useCallback((e: TouchEvent) => {
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 40) return;
    const dir = dy > 0 ? 1 : -1;
    setActiveIndex((prev) => {
      const next = Math.max(0, Math.min(STEPS.length - 1, prev + dir));
      targetProgressRef.current = SNAP_VALS[next];
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
      return next;
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel",      onWheel,      { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener("wheel",      onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, [onWheel, onTouchStart, onTouchEnd]);

  // ── Three.js ──────────────────────────────────────────────────────────────
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

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
    camera.position.set(0, 0.3, RADIUS * 4.5);
    cameraRef.current = camera;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sun = new THREE.DirectionalLight(0xfffaf0, 1.6);
    sun.position.set(6, 3, 5);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x6699ff, 0.3);
    fill.position.set(-5, 2, -3);
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
      new THREE.MeshStandardMaterial({
        map: earthTex, bumpMap: bumpTex, bumpScale: 0.035, roughness: 0.8, metalness: 0.0,
      }),
    ));

    const anchors = MARKERS.map((m) => {
      const a = new THREE.Object3D();
      a.position.copy(latLngToVec3(m.lat, m.lng, RADIUS * 1.005));
      globeGroup.add(a);
      return a;
    });
    anchorsRef.current = anchors;

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

    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick);

      const prev = displayProgressRef.current;
      const next = prev + (targetProgressRef.current - prev) * 0.07;
      displayProgressRef.current = next;
      if (Math.abs(next - prev) > 0.0003) setDisplayProg(next);

      globeGroup.rotation.y = next * Math.PI * 1.6;

      camera.getWorldPosition(camPos);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      setMarkerUIs(anchors.map((anchor, i) => {
        anchor.getWorldPosition(projected);
        const facing = projected.clone().normalize().dot(camPos.clone().normalize());
        const p = projected.clone().project(camera);
        return {
          code:   MARKERS[i].code,
          x:      (p.x * 0.5 + 0.5) * w,
          y:      (1 - (p.y * 0.5 + 0.5)) * h,
          behind: facing < 0.08 || p.z > 1,
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

  const step     = STEPS[activeIndex];
  const focusSet = new Set(step.focus);

  return (
    <div ref={containerRef} className={styles.container}>

      {/* ── globe canvas ── */}
      <div className={styles.globeSide} ref={wrapRef}>
        <canvas ref={canvasRef} className={styles.canvas} />

        <div className={styles.markersLayer}>
          {markerUIs.map((m) => {
            if (m.behind) return null;
            const data    = MARKERS.find((mk) => mk.code === m.code)!;
            const focused = focusSet.has(m.code);
            return (
              <div
                key={m.code}
                className={`${styles.marker} ${focused ? styles.markerFocused : styles.markerDim}`}
                style={{ transform: `translate(${m.x}px, ${m.y}px) translate(-50%,-100%)` }}
              >
                <div className={styles.chip}>
                  <span className={styles.avatar}>{m.code}</span>
                  <span className={styles.chipText}>
                    {data.city}
                    <small>{data.name.toUpperCase()}</small>
                  </span>
                </div>
                <div className={styles.stem} />
                <div className={`${styles.pin} ${focused ? styles.pinFocused : ""}`} />
              </div>
            );
          })}
        </div>

      </div>

      {/* ── content ── */}
      <div className={styles.contentSide}>
        <div key={step.id} className={`${styles.slide} ${animating ? styles.slideIn : ""}`}>
          <span className={styles.stepNum}>{step.number}</span>

          <h2 className={styles.title}>
            {step.title}{" "}
            <span className={styles.highlight}>{step.highlight}</span>
          </h2>

          <p className={styles.desc}>{step.description}</p>

          <span className={styles.keyLabel}>Key Outputs</span>

          <div className={styles.tags}>
            {step.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

        {/* progress bar + rocket */}
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ height: `${displayProg * 100}%` }}
            />
            <div
              className={styles.rocketWrap}
              style={{ bottom: `calc(${displayProg * 100}% - 24px)` }}
            >
              <Image
                src="/images/journey/rocket.png"
                alt="Rocket"
                width={32}
                height={44}
                priority
              />
              <div className={styles.flame} />
            </div>
          </div>
        </div>
      </div>

      {/* ── dots + step nav ── */}
      <div className={styles.dots}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
