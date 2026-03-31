"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./JourneySectionMainGlobeCountryHighlight.module.scss";

type TeamPresenceItem = {
  country?: string;
  countryName?: string;
  countryCode?: string;
  iso3?: string;
  members?: number;
  value?: number;
};

const DEFAULT_TEAM_DATA: TeamPresenceItem[] = [
  { countryName: "India", members: 42 },
  { countryName: "United States of America", members: 24 },
  { countryName: "United Kingdom", members: 12 },
  { countryName: "Canada", members: 8 },
  { countryName: "Australia", members: 6 },
  { countryName: "United Arab Emirates", members: 5 },
];

const BaseGlobe = dynamic(() => import("./Globe/Globe"), {
  ssr: false,
  loading: () => <div className={styles.globeCanvas} />,
});

const resolveItemValue = (item: TeamPresenceItem) =>
  Math.max(0, item.members ?? item.value ?? 0);

interface JourneySectionMainGlobeCountryHighlightProps {
  data?: TeamPresenceItem[];
}

export default function JourneySectionMainGlobeCountryHighlight({
  data = DEFAULT_TEAM_DATA,
}: JourneySectionMainGlobeCountryHighlightProps) {
  const mountedRef = useRef(true);
  const [fps, setFps] = useState(0);
  const [fpsHistory, setFpsHistory] = useState<number[]>([]);

  const highlightCountries = useMemo(() => {
    return data
      .map((item) => ({
        iso3: item.iso3,
        countryCode: item.countryCode,
        country: item.country,
        countryName: item.countryName,
        value: resolveItemValue(item),
      }))
      .filter((item) => item.value > 0);
  }, [data]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let start = performance.now();
    let mounted = true;

    const tick = (now: number) => {
      if (!mounted || !mountedRef.current) return;
      frames += 1;
      const elapsed = now - start;
      if (elapsed >= 500) {
        const nextFps = Math.round((frames * 1000) / elapsed);
        setFps(nextFps);
        setFpsHistory((prev) => [...prev.slice(-17), Math.max(0, nextFps)]);
        frames = 0;
        start = now;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.globeStage}>
        <div className={styles.perfBadge}>
          <span>FPS: {fps || "--"}</span>
          <span>Main Globe textures</span>
          <span>Pointer off</span>
          <div className={styles.fpsStrip} role="img" aria-label="FPS history">
            {fpsHistory.map((sample, index) => (
              <i
                key={`${sample}-${index}`}
                className={styles.fpsBar}
                style={{ height: `${Math.max(6, Math.min(100, sample))}%` }}
              />
            ))}
          </div>
        </div>
        <div className={styles.baseLayer}>
          <BaseGlobe
            className={styles.globeCanvas}
            mode="day"
            showOrbits={false}
            autoRotate
            highlightCountries={highlightCountries}
          />
        </div>
      </div>
      <aside className={styles.panel}>
        <p className={styles.overline}>Main Globe + Country Highlights</p>
        <h3 className={styles.title}>Team presence by country</h3>
        <ul className={styles.list}>
          {data.map((item, index) => {
            const label =
              item.countryName || item.country || item.countryCode || item.iso3;
            if (!label) return null;
            return (
              <li key={`${label}-${index}`} className={styles.row}>
                <span>{label}</span>
                <strong>{resolveItemValue(item)}</strong>
              </li>
            );
          })}
        </ul>
      </aside>
    </section>
  );
}
