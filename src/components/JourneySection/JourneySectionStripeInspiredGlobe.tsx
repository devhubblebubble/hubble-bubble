"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./JourneySectionStripeInspiredGlobe.module.scss";

type TradeCategory = "mil" | "civ" | "ammo";

type TradeFlowRow = {
  t: number;
  e: string;
  i: string;
  v: number;
  wc: TradeCategory;
};

type ArcDatum = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  value: number;
  category: TradeCategory;
  direction: "export" | "import";
};

type PointDatum = {
  lat: number;
  lng: number;
  value: number;
  countryName: string;
  color: string;
};

type GlobeInstance = {
  width: (px: number) => GlobeInstance;
  height: (px: number) => GlobeInstance;
  backgroundColor: (value: string) => GlobeInstance;
  globeImageUrl: (url: string) => GlobeInstance;
  bumpImageUrl: (url: string) => GlobeInstance;
  showAtmosphere: (value: boolean) => GlobeInstance;
  atmosphereColor: (value: string) => GlobeInstance;
  atmosphereAltitude: (value: number) => GlobeInstance;
  arcsData: (items: ArcDatum[]) => GlobeInstance;
  arcStartLat: (key: keyof ArcDatum) => GlobeInstance;
  arcStartLng: (key: keyof ArcDatum) => GlobeInstance;
  arcEndLat: (key: keyof ArcDatum) => GlobeInstance;
  arcEndLng: (key: keyof ArcDatum) => GlobeInstance;
  arcColor: (fn: (item: ArcDatum) => string) => GlobeInstance;
  arcAltitude: (fn: (item: ArcDatum) => number) => GlobeInstance;
  arcStroke: (fn: (item: ArcDatum) => number) => GlobeInstance;
  arcDashLength: (value: number) => GlobeInstance;
  arcDashGap: (value: number) => GlobeInstance;
  arcDashAnimateTime: (fn: (item: ArcDatum) => number) => GlobeInstance;
  pointsData: (items: PointDatum[]) => GlobeInstance;
  pointLat: (key: keyof PointDatum) => GlobeInstance;
  pointLng: (key: keyof PointDatum) => GlobeInstance;
  pointColor: (fn: (item: PointDatum) => string) => GlobeInstance;
  pointAltitude: (fn: (item: PointDatum) => number) => GlobeInstance;
  pointRadius: (fn: (item: PointDatum) => number) => GlobeInstance;
  pointsMerge: (value: boolean) => GlobeInstance;
  pointsTransitionDuration: (value: number) => GlobeInstance;
  enablePointerInteraction: (value: boolean) => GlobeInstance;
  pointOfView: (
    coords: { lat: number; lng: number; altitude: number },
    ms?: number
  ) => GlobeInstance;
  controls: () =>
    | {
        autoRotate?: boolean;
        autoRotateSpeed?: number;
        enableZoom?: boolean;
        enablePan?: boolean;
      }
    | undefined;
  _destructor?: () => void;
};

const EARTH_DAY_TEXTURE = "/textures/planets/earth_day_2048.webp";
const EARTH_BUMP_TEXTURE = "/textures/planets/earth_bump_roughness_clouds_2048.webp";

const CATEGORY_LABEL: Record<TradeCategory, string> = {
  mil: "Military",
  civ: "Civilian",
  ammo: "Ammo",
};

const CATEGORY_COLOR: Record<TradeCategory, string> = {
  mil: "#ff7f4f",
  civ: "#72df7e",
  ammo: "#56a9ff",
};

const EXPORT_COLOR = "#ff7f4f";
const IMPORT_COLOR = "#56a9ff";

const COUNTRY_COORDS: Record<string, { lat: number; lng: number }> = {
  "UNITED STATES": { lat: 38.9072, lng: -77.0369 },
  INDIA: { lat: 20.5937, lng: 78.9629 },
  "UNITED KINGDOM": { lat: 51.5074, lng: -0.1278 },
  CANADA: { lat: 45.4215, lng: -75.6972 },
  AUSTRALIA: { lat: -35.2809, lng: 149.13 },
  "UNITED ARAB EMIRATES": { lat: 24.4539, lng: 54.3773 },
  FRANCE: { lat: 48.8566, lng: 2.3522 },
  GERMANY: { lat: 52.52, lng: 13.405 },
  JAPAN: { lat: 35.6762, lng: 139.6503 },
  BRAZIL: { lat: -15.7939, lng: -47.8828 },
  NIGERIA: { lat: 9.0765, lng: 7.3986 },
  "SOUTH AFRICA": { lat: -25.7479, lng: 28.2293 },
  SINGAPORE: { lat: 1.3521, lng: 103.8198 },
  MEXICO: { lat: 19.4326, lng: -99.1332 },
  INDONESIA: { lat: -6.2088, lng: 106.8456 },
};

const FLOW_ROWS: TradeFlowRow[] = [
  { t: 2008, e: "UNITED STATES", i: "INDIA", v: 185, wc: "mil" },
  { t: 2008, e: "UNITED STATES", i: "UNITED KINGDOM", v: 92, wc: "ammo" },
  { t: 2008, e: "UNITED STATES", i: "CANADA", v: 74, wc: "civ" },
  { t: 2008, e: "FRANCE", i: "UNITED STATES", v: 61, wc: "mil" },
  { t: 2008, e: "GERMANY", i: "UNITED STATES", v: 49, wc: "ammo" },
  { t: 2008, e: "JAPAN", i: "UNITED STATES", v: 38, wc: "civ" },
  { t: 2009, e: "UNITED STATES", i: "AUSTRALIA", v: 98, wc: "mil" },
  { t: 2009, e: "UNITED STATES", i: "UNITED ARAB EMIRATES", v: 86, wc: "ammo" },
  { t: 2009, e: "UNITED STATES", i: "MEXICO", v: 79, wc: "civ" },
  { t: 2009, e: "CANADA", i: "UNITED STATES", v: 67, wc: "ammo" },
  { t: 2009, e: "INDIA", i: "UNITED STATES", v: 58, wc: "mil" },
  { t: 2009, e: "UNITED KINGDOM", i: "UNITED STATES", v: 44, wc: "civ" },
  { t: 2010, e: "UNITED STATES", i: "INDIA", v: 204, wc: "mil" },
  { t: 2010, e: "UNITED STATES", i: "SINGAPORE", v: 118, wc: "ammo" },
  { t: 2010, e: "UNITED STATES", i: "BRAZIL", v: 95, wc: "civ" },
  { t: 2010, e: "GERMANY", i: "UNITED STATES", v: 73, wc: "mil" },
  { t: 2010, e: "NIGERIA", i: "UNITED STATES", v: 52, wc: "ammo" },
  { t: 2010, e: "SOUTH AFRICA", i: "UNITED STATES", v: 41, wc: "civ" },
];

export default function JourneySectionStripeInspiredGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const [fps, setFps] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2010);
  const [selectedCountry, setSelectedCountry] = useState("UNITED STATES");
  const [enabledCategories, setEnabledCategories] = useState<Record<TradeCategory, boolean>>({
    mil: true,
    civ: true,
    ammo: true,
  });

  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let start = performance.now();
    let mounted = true;

    const tick = (now: number) => {
      if (!mounted) return;
      frames += 1;
      const elapsed = now - start;
      if (elapsed >= 500) {
        setFps(Math.round((frames * 1000) / elapsed));
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

  const years = useMemo(
    () => Array.from(new Set(FLOW_ROWS.map((row) => row.t))).sort((a, b) => a - b),
    []
  );

  const availableCountries = useMemo(() => {
    const countrySet = new Set<string>();
    for (const row of FLOW_ROWS) {
      countrySet.add(row.e);
      countrySet.add(row.i);
    }
    return Array.from(countrySet).sort();
  }, []);

  const activeCategoryCount = useMemo(
    () => (Object.values(enabledCategories).filter(Boolean).length || 1),
    [enabledCategories]
  );

  const { arcs, points, topCountries } = useMemo(() => {
    const categoryOn = (category: TradeCategory) => enabledCategories[category];
    const rows = FLOW_ROWS.filter(
      (row) =>
        row.t === selectedYear &&
        categoryOn(row.wc) &&
        (row.e === selectedCountry || row.i === selectedCountry)
    );

    const nextArcs: ArcDatum[] = [];
    const totals = new Map<string, number>();
    const isSelectedKnown = Boolean(COUNTRY_COORDS[selectedCountry]);

    for (const row of rows) {
      const exporter = COUNTRY_COORDS[row.e];
      const importer = COUNTRY_COORDS[row.i];
      if (!exporter || !importer) continue;
      if (!isSelectedKnown) continue;

      const direction: ArcDatum["direction"] =
        row.e === selectedCountry ? "export" : "import";

      nextArcs.push({
        startLat: exporter.lat,
        startLng: exporter.lng,
        endLat: importer.lat,
        endLng: importer.lng,
        value: row.v,
        category: row.wc,
        direction,
      });

      const counterparty = row.e === selectedCountry ? row.i : row.e;
      totals.set(counterparty, (totals.get(counterparty) ?? 0) + row.v);
    }

    const maxTotal = Math.max(1, ...Array.from(totals.values()));
    const nextPoints: PointDatum[] = Array.from(totals.entries()).flatMap(([name, value]) => {
      const coords = COUNTRY_COORDS[name];
      if (!coords) return [];
      const isNetExport = rows.some((row) => row.e === selectedCountry && row.i === name);
      return [
        {
          countryName: name,
          lat: coords.lat,
          lng: coords.lng,
          value,
          color: isNetExport ? EXPORT_COLOR : IMPORT_COLOR,
        },
      ];
    });

    const ranking = Array.from(totals.entries())
      .map(([countryName, value]) => ({
        countryName,
        value,
        ratio: value / maxTotal,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    return { arcs: nextArcs, points: nextPoints, topCountries: ranking };
  }, [enabledCategories, selectedCountry, selectedYear]);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    const init = async () => {
      const globeModule = await import("globe.gl");
      if (cancelled || !containerRef.current) return;

      const Globe = globeModule.default as unknown as new (
        element: HTMLElement,
        options?: Record<string, unknown>
      ) => GlobeInstance;

      const globe = new Globe(containerRef.current, {
        animateIn: false,
        waitForGlobeReady: true,
        rendererConfig: {
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        },
      });

      globeRef.current = globe;

      const size = containerRef.current.getBoundingClientRect();
      globe
        .width(Math.max(320, Math.floor(size.width)))
        .height(Math.max(340, Math.floor(size.height)))
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl(EARTH_DAY_TEXTURE)
        .bumpImageUrl(EARTH_BUMP_TEXTURE)
        .showAtmosphere(true)
        .atmosphereColor("#8cc4ff")
        .atmosphereAltitude(0.15)
        .enablePointerInteraction(false)
        .pointOfView({ lat: 24, lng: -15, altitude: 2.2 });

      const controls = globe.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.35;
        controls.enableZoom = false;
        controls.enablePan = false;
      }

      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry || !globeRef.current) return;
        globeRef.current.width(Math.max(320, Math.floor(entry.contentRect.width)));
        globeRef.current.height(Math.max(340, Math.floor(entry.contentRect.height)));
      });
      resizeObserver.observe(containerRef.current);
    };

    void init();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      if (globeRef.current?._destructor) globeRef.current._destructor();
      globeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    const maxArcValue = Math.max(1, ...arcs.map((item) => item.value));
    const maxPointValue = Math.max(1, ...points.map((item) => item.value));

    globeRef.current
      .arcsData(arcs)
      .arcStartLat("startLat")
      .arcStartLng("startLng")
      .arcEndLat("endLat")
      .arcEndLng("endLng")
      .arcColor((item) =>
        item.direction === "export"
          ? CATEGORY_COLOR[item.category]
          : "rgba(86,169,255,0.9)"
      )
      .arcAltitude((item) => 0.07 + (item.value / maxArcValue) * 0.18)
      .arcStroke((item) => 0.35 + (item.value / maxArcValue) * 0.95)
      .arcDashLength(0.35)
      .arcDashGap(0.8 + (4 - activeCategoryCount) * 0.2)
      .arcDashAnimateTime((item) => 1200 + Math.floor((item.value / maxArcValue) * 1800))
      .pointsData(points)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor((item) => item.color)
      .pointAltitude((item) => 0.02 + (item.value / maxPointValue) * 0.08)
      .pointRadius((item) => 0.08 + (item.value / maxPointValue) * 0.12)
      .pointsMerge(false)
      .pointsTransitionDuration(250);
  }, [activeCategoryCount, arcs, points]);

  return (
    <section className={styles.section}>
      <div className={styles.globeStage}>
        <div className={styles.badgeRow}>
          <span>FPS: {fps || "--"}</span>
          <span>Stripe-style flow arcs</span>
          <span>Shader globe-inspired controls</span>
        </div>
        <div ref={containerRef} className={styles.globeCanvas} />
      </div>

      <aside className={styles.sidePanel}>
        <p className={styles.kicker}>Stripe-Inspired Globe</p>
        <h3 className={styles.heading}>Trade-style route intelligence</h3>
        <div className={styles.controls}>
          <label className={styles.controlBlock}>
            <span>Focus country</span>
            <select
              className={styles.select}
              value={selectedCountry}
              onChange={(event) => setSelectedCountry(event.target.value)}
            >
              {availableCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.controlBlock}>
            <span>Year</span>
            <input
              className={styles.yearSlider}
              type="range"
              min={Math.min(...years)}
              max={Math.max(...years)}
              step={1}
              value={selectedYear}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
            />
            <strong className={styles.yearValue}>{selectedYear}</strong>
          </label>
        </div>

        <div className={styles.chipRow}>
          {(Object.keys(CATEGORY_LABEL) as TradeCategory[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`${styles.filterChip} ${
                enabledCategories[key] ? styles.filterChipActive : ""
              }`}
              onClick={() =>
                setEnabledCategories((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            >
              {CATEGORY_LABEL[key]}
            </button>
          ))}
        </div>

        <ul className={styles.countryList}>
          {topCountries.map((country) => (
            <li key={country.countryName} className={styles.countryRow}>
              <span>{country.countryName}</span>
              <strong>{country.value}</strong>
              <i style={{ width: `${Math.max(10, country.ratio * 100)}%` }} />
            </li>
          ))}
          {!topCountries.length ? (
            <li className={styles.emptyState}>
              No route data for this country/year/category combination.
            </li>
          ) : null}
        </ul>
      </aside>
    </section>
  );
}
