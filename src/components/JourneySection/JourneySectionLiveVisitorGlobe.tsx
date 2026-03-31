"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./JourneySectionLiveVisitorGlobe.module.scss";

type VisitorEvent = {
  id: string;
  userName: string;
  avatarSeed: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  action: string;
  signedInAt: string;
};

type MarkerCluster = {
  id: string;
  lat: number;
  lng: number;
  users: VisitorEvent[];
  action: string;
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
  htmlElementsData: (items: MarkerCluster[]) => GlobeInstance;
  htmlLat: (key: keyof MarkerCluster) => GlobeInstance;
  htmlLng: (key: keyof MarkerCluster) => GlobeInstance;
  htmlAltitude: (value: number) => GlobeInstance;
  htmlElement: (fn: (item: MarkerCluster) => HTMLElement) => GlobeInstance;
  htmlTransitionDuration: (value: number) => GlobeInstance;
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
  enablePointerInteraction: (value: boolean) => GlobeInstance;
  _destructor?: () => void;
};

const ALL_EVENTS: VisitorEvent[] = [
  {
    id: "v1",
    userName: "Aarav",
    avatarSeed: "aarav",
    city: "Bengaluru",
    country: "India",
    lat: 12.9716,
    lng: 77.5946,
    action: "signed_in",
    signedInAt: "Just now",
  },
  {
    id: "v2",
    userName: "Mia",
    avatarSeed: "mia",
    city: "Toronto",
    country: "Canada",
    lat: 43.6532,
    lng: -79.3832,
    action: "opened_dashboard",
    signedInAt: "5s ago",
  },
  {
    id: "v3",
    userName: "Noah",
    avatarSeed: "noah",
    city: "London",
    country: "United Kingdom",
    lat: 51.5072,
    lng: -0.1276,
    action: "performed_scroll_to_uni",
    signedInAt: "12s ago",
  },
  {
    id: "v4",
    userName: "Sofia",
    avatarSeed: "sofia",
    city: "Dubai",
    country: "United Arab Emirates",
    lat: 25.2048,
    lng: 55.2708,
    action: "viewed_course",
    signedInAt: "18s ago",
  },
  {
    id: "v5",
    userName: "Liam",
    avatarSeed: "liam",
    city: "San Francisco",
    country: "United States",
    lat: 37.7749,
    lng: -122.4194,
    action: "signed_in",
    signedInAt: "21s ago",
  },
  {
    id: "v6",
    userName: "Emma",
    avatarSeed: "emma",
    city: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093,
    action: "opened_dashboard",
    signedInAt: "34s ago",
  },
  {
    id: "v7",
    userName: "Lucas",
    avatarSeed: "lucas",
    city: "Lagos",
    country: "Nigeria",
    lat: 6.5244,
    lng: 3.3792,
    action: "started_application",
    signedInAt: "45s ago",
  },
  {
    id: "v8",
    userName: "Olivia",
    avatarSeed: "olivia",
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    action: "performed_scroll_to_uni",
    signedInAt: "53s ago",
  },
];

const EARTH_DAY_TEXTURE = "/textures/planets/earth_day_2048.webp";
const EARTH_BUMP_TEXTURE = "/textures/planets/earth_bump_roughness_clouds_2048.webp";
const ACTION_LABELS: Record<string, string> = {
  signed_in: "signed in",
  opened_dashboard: "opened dashboard",
  viewed_course: "viewed course",
  started_application: "started application",
  performed_scroll_to_uni: "performed scroll_to_uni",
};

function buildClusters(events: VisitorEvent[]): MarkerCluster[] {
  const clusters: MarkerCluster[] = [];
  const threshold = 10;

  for (const event of events) {
    const existing = clusters.find((cluster) => {
      const latDiff = Math.abs(cluster.lat - event.lat);
      const lngDiff = Math.abs(cluster.lng - event.lng);
      return latDiff <= threshold && lngDiff <= threshold;
    });

    if (existing) {
      existing.users.push(event);
      existing.lat =
        (existing.lat * (existing.users.length - 1) + event.lat) /
        existing.users.length;
      existing.lng =
        (existing.lng * (existing.users.length - 1) + event.lng) /
        existing.users.length;
      continue;
    }

    clusters.push({
      id: event.id,
      lat: event.lat,
      lng: event.lng,
      users: [event],
      action: event.action,
    });
  }

  return clusters;
}

function createMarkerElement(cluster: MarkerCluster): HTMLElement {
  const root = document.createElement("div");
  root.className = styles.marker;

  const avatarStack = document.createElement("div");
  avatarStack.className = styles.avatarStack;

  const usersToShow = cluster.users.slice(0, 3);
  usersToShow.forEach((user, index) => {
    const avatar = document.createElement("img");
    avatar.className = styles.avatar;
    avatar.alt = user.userName;
    avatar.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(
      user.avatarSeed
    )}`;
    avatar.style.left = `${index * 18}px`;
    avatar.style.zIndex = String(10 - index);
    avatarStack.appendChild(avatar);
  });

  const status = document.createElement("span");
  status.className = styles.statusDot;
  avatarStack.appendChild(status);

  root.appendChild(avatarStack);

  const actionChip = document.createElement("div");
  actionChip.className = styles.actionChip;
  const actionText = ACTION_LABELS[cluster.action] ?? "active now";
  actionChip.textContent = actionText;
  root.appendChild(actionChip);

  return root;
}

interface JourneySectionLiveVisitorGlobeProps {
  events?: VisitorEvent[];
}

export default function JourneySectionLiveVisitorGlobe({
  events = ALL_EVENTS,
}: JourneySectionLiveVisitorGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const [activeEvents, setActiveEvents] = useState<VisitorEvent[]>(
    events.slice(0, 5)
  );

  useEffect(() => {
    if (!events.length) return;
    setActiveEvents(events.slice(0, Math.min(5, events.length)));
  }, [events]);

  useEffect(() => {
    if (events.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveEvents((prev) => {
        const currentIds = new Set(prev.map((item) => item.id));
        const nextCandidate = events.find((item) => !currentIds.has(item.id));
        if (!nextCandidate) {
          return events.slice(0, Math.min(5, events.length));
        }
        return [nextCandidate, ...prev].slice(0, 6);
      });
    }, 2200);
    return () => window.clearInterval(timer);
  }, [events]);

  const clusters = useMemo(() => buildClusters(activeEvents), [activeEvents]);

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
        .width(Math.max(300, Math.floor(size.width)))
        .height(Math.max(300, Math.floor(size.height)))
        .backgroundColor("rgba(0,0,0,0)")
        .globeImageUrl(EARTH_DAY_TEXTURE)
        .bumpImageUrl(EARTH_BUMP_TEXTURE)
        .showAtmosphere(true)
        .atmosphereColor("#9bcfff")
        .atmosphereAltitude(0.14)
        .enablePointerInteraction(false)
        .pointOfView({ lat: 18, lng: -20, altitude: 2.2 });

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
        const { width, height } = entry.contentRect;
        globeRef.current.width(Math.max(300, Math.floor(width)));
        globeRef.current.height(Math.max(300, Math.floor(height)));
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
    globeRef.current
      .htmlElementsData(clusters)
      .htmlLat("lat")
      .htmlLng("lng")
      .htmlAltitude(0.03)
      .htmlElement((item) => createMarkerElement(item))
      .htmlTransitionDuration(200);
  }, [clusters]);

  return (
    <section className={styles.section}>
      <div className={styles.globeStage}>
        <div className={styles.glow} />
        <div ref={containerRef} className={styles.globeCanvas} />
      </div>
      <div className={styles.headline}>
        <p className={styles.overline}>Live Visitor Intelligence</p>
        <h3 className={styles.title}>Watch visitors in real time</h3>
      </div>
    </section>
  );
}
