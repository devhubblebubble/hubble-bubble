"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./JourneySectionCountryGlobe.module.scss";

type TeamPresenceItem = {
  country?: string;
  countryName?: string;
  countryCode?: string;
  iso3?: string;
  members?: number;
  value?: number;
};

type CountryFeature = {
  id?: string;
  properties?: {
    name?: string;
  };
  geometry?: unknown;
};

type CountriesGeoJson = {
  features?: CountryFeature[];
};

type GlobeInstance = {
  width: (px: number) => GlobeInstance;
  height: (px: number) => GlobeInstance;
  backgroundColor: (value: string) => GlobeInstance;
  globeImageUrl: (url: string) => GlobeInstance;
  showAtmosphere: (value: boolean) => GlobeInstance;
  atmosphereColor: (value: string) => GlobeInstance;
  atmosphereAltitude: (value: number) => GlobeInstance;
  polygonsData: (items: CountryFeature[]) => GlobeInstance;
  polygonCapColor: (fn: (feature: CountryFeature) => string) => GlobeInstance;
  polygonSideColor: (fn: (feature: CountryFeature) => string) => GlobeInstance;
  polygonStrokeColor: (value: string) => GlobeInstance;
  polygonAltitude: (fn: (feature: CountryFeature) => number) => GlobeInstance;
  polygonCapCurvatureResolution: (value: number) => GlobeInstance;
  polygonsTransitionDuration: (value: number) => GlobeInstance;
  pointOfView: (
    coords: { lat: number; lng: number; altitude: number },
    ms?: number
  ) => GlobeInstance;
  controls: () =>
    | { autoRotate?: boolean; autoRotateSpeed?: number }
    | undefined;
  enablePointerInteraction: (value: boolean) => GlobeInstance;
  _destructor?: () => void;
};

const DEFAULT_TEAM_DATA: TeamPresenceItem[] = [
  { countryName: "India", members: 42 },
  { countryName: "United States of America", members: 24 },
  { countryName: "United Kingdom", members: 12 },
  { countryName: "Canada", members: 8 },
  { countryName: "Australia", members: 6 },
  { countryName: "United Arab Emirates", members: 5 },
];

const COUNTRIES_GEOJSON_URL =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

const EARTH_TEXTURE_URL =
  "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const BASE_VIEW = { lat: 20, lng: 12, altitude: 2.1 };
const SCROLL_ROTATION_DEGREES = 360;

const normalizeKey = (value: string) => value.trim().toLowerCase();

const resolveItemValue = (item: TeamPresenceItem) =>
  Math.max(0, item.members ?? item.value ?? 0);

interface JourneySectionCountryGlobeProps {
  data?: TeamPresenceItem[];
  onlyGlobe?: boolean;
  className?: string;
  rotation?: number;
}

export default function JourneySectionCountryGlobe({
  data = DEFAULT_TEAM_DATA,
  onlyGlobe = false,
  className,
  rotation = 0,
}: JourneySectionCountryGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const readyRef = useRef(false);
  const [countries, setCountries] = useState<CountryFeature[]>([]);

  const normalizedDataMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of data) {
      const value = resolveItemValue(entry);
      if (!value) continue;
      const keys = [
        entry.iso3,
        entry.countryCode,
        entry.country,
        entry.countryName,
      ].filter(Boolean) as string[];
      for (const key of keys) {
        map.set(normalizeKey(key), value);
      }
    }
    return map;
  }, [data]);

  const maxValue = useMemo(() => {
    const values = Array.from(normalizedDataMap.values());
    return values.length ? Math.max(...values) : 1;
  }, [normalizedDataMap]);

  useEffect(() => {
    const controller = new AbortController();
    const loadCountries = async () => {
      try {
        const response = await fetch(COUNTRIES_GEOJSON_URL, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = (await response.json()) as CountriesGeoJson;
        setCountries(payload.features ?? []);
      } catch {
        // Silently keep fallback empty state if geo data fails.
      }
    };
    void loadCountries();
    return () => controller.abort();
  }, []);

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
        waitForGlobeReady: false,
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
        .height(Math.max(320, Math.floor(size.height)))
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl(EARTH_TEXTURE_URL)
        .showAtmosphere(true)
        .atmosphereColor("#4cb3ff")
        .atmosphereAltitude(0.12)
        .polygonsData(countries)
        .polygonStrokeColor("rgba(0,0,0,0)")
        .polygonCapCurvatureResolution(2)
        .polygonCapColor((feature: CountryFeature) => {
          const iso3 = feature.id ? normalizeKey(feature.id) : "";
          const name = feature.properties?.name
            ? normalizeKey(feature.properties.name)
            : "";
          const value = normalizedDataMap.get(iso3) ?? normalizedDataMap.get(name);
          if (!value) return "rgba(0, 0, 0, 0)";
          const ratio = Math.min(1, value / maxValue);
          const alpha = 0.5 + ratio * 0.35;
          return `rgba(255, 102, 41, ${alpha.toFixed(3)})`;
        })
        .polygonSideColor(() => "rgba(0, 0, 0, 0)")
        .polygonAltitude((feature: CountryFeature) => {
          const iso3 = feature.id ? normalizeKey(feature.id) : "";
          const name = feature.properties?.name
            ? normalizeKey(feature.properties.name)
            : "";
          const value = normalizedDataMap.get(iso3) ?? normalizedDataMap.get(name);
          return value ? 0.001 : 0;
        })
        .polygonsTransitionDuration(250)
        .enablePointerInteraction(false)
        .pointOfView(BASE_VIEW);

      const controls = globe.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.45;
      }
      readyRef.current = true;

      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry || !globeRef.current) return;
        const { width, height } = entry.contentRect;
        globeRef.current.width(Math.max(320, Math.floor(width)));
        globeRef.current.height(Math.max(320, Math.floor(height)));
      });
      resizeObserver.observe(containerRef.current);
    };

    void init();

    return () => {
      cancelled = true;
      readyRef.current = false;
      resizeObserver?.disconnect();
      if (globeRef.current?._destructor) {
        globeRef.current._destructor();
      }
      globeRef.current = null;
    };
  }, [countries, maxValue, normalizedDataMap]);

  useEffect(() => {
    if (!globeRef.current || !readyRef.current) return;

    const normalizedRotation = Math.max(0, Math.min(1, rotation));
    const targetLng =
      BASE_VIEW.lng + normalizedRotation * SCROLL_ROTATION_DEGREES;

    globeRef.current.pointOfView(
      {
        lat: BASE_VIEW.lat,
        lng: targetLng,
        altitude: BASE_VIEW.altitude,
      },
      220
    );
  }, [rotation]);

  if (onlyGlobe) {
    return <div className={className ?? styles.globeStage} ref={containerRef} />;
  }

  return (
    <section className={styles.section}>
      <div className={styles.globeStage} ref={containerRef} />
      <aside className={styles.panel}>
        <p className={styles.overline}>Global Talent Map</p>
        <h3 className={styles.title}>People working from these countries</h3>
        <ul className={styles.list}>
          {data.map((item, index) => {
            const label =
              item.countryName || item.country || item.countryCode || item.iso3;
            if (!label) return null;
            const value = resolveItemValue(item);
            return (
              <li key={`${label}-${index}`} className={styles.row}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            );
          })}
        </ul>
      </aside>
    </section>
  );
}
