"use client";

import type { CSSProperties, RefObject } from "react";
import styles from "./WorldMapNetwork.module.css";
import { defaultLocations, defaultRoutes } from "./world-map-network/data";
import type { WorldMapNetworkProps } from "./world-map-network/types";
import { useWorldMapRenderer } from "./world-map-network/useWorldMapRenderer";

export type { MapLocation, MapRoute, WorldMapNetworkProps } from "./world-map-network/types";
export { defaultLocations, defaultRoutes } from "./world-map-network/data";

export function WorldMapNetwork({
  embedded = false,
  className,
  dataUrl = "/world-110m.json",
  locations = defaultLocations,
  routes = defaultRoutes,
  headline = "",
  height,
  minHeight,
  mapScale = 1,
  fitPaddingX = 0.08,
  fitPaddingTop = 0,
  fitPaddingBottom = 18,
  activeRoutes = 10,
  routeDuration = 17500,
  routeDurationJitter = 3200,
  routeDestinationHold = 2000,
  routeFadeDuration = 420,
}: WorldMapNetworkProps) {
  const resolvedMinHeight = minHeight ?? (embedded ? undefined : "100vh");

  const rootStyle: CSSProperties = {};
  if (height !== undefined) {
    rootStyle.height = typeof height === "number" ? `${height}px` : height;
  }
  if (resolvedMinHeight !== undefined) {
    rootStyle.minHeight = typeof resolvedMinHeight === "number" ? `${resolvedMinHeight}px` : resolvedMinHeight;
  }

  const { rootRef, svgRef } = useWorldMapRenderer({
    dataUrl,
    locations,
    routes,
    headline,
    mapScale,
    fitPaddingX,
    fitPaddingTop,
    fitPaddingBottom,
    activeRoutes,
    routeDuration,
    routeDurationJitter,
    routeDestinationHold,
    routeFadeDuration,
  });

  const rootClassName = [styles.map, embedded && styles.mapEmbedded, className].filter(Boolean).join(" ");

  const chart = (
    <svg ref={svgRef} className={styles.svg} role="img" aria-labelledby="network-map-title network-map-description">
      <title id="network-map-title">Global service route map</title>
      <desc id="network-map-description">
        A dark world map with highlighted global locations connected by curved orange route lines.
      </desc>
      <g className={styles.countries} />
      <g className={styles.borders} />
      <g className={styles.routes} />
      <g className={styles.routeFlows} />
      <g className={styles.points} />
    </svg>
  );

  if (embedded) {
    return (
      <div ref={rootRef as RefObject<HTMLDivElement>} className={rootClassName} style={rootStyle} role="region" aria-label="Global route map">
        {chart}
      </div>
    );
  }

  return (
    <section ref={rootRef} className={rootClassName} style={rootStyle} aria-label="Global route map">
      {chart}
    </section>
  );
}
