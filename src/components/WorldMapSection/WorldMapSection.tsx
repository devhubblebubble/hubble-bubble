"use client";

import { useId, useMemo } from "react";

import styles from "./WorldMapSection.module.scss";
import { worldMapConnections, worldMapPoints } from "./worldMapSection.data";
import {
  arcPathD,
  MAP_FRAME_HEIGHT,
  MAP_FRAME_WIDTH,
  MAP_IMG_H,
  MAP_IMG_W,
  MAP_IMG_X,
  MAP_IMG_Y,
  projectLatLng,
  type MapPoint,
} from "./projectMap";

/**
 * Natural Earth–style country SVG (same pipeline as Smashing Magazine’s Kartograph guide).
 * Replace this file with your own `world.svg` export; if viewBox size changes, update
 * `MAP_SOURCE_VIEW_W` / `MAP_SOURCE_VIEW_H` in `projectMap.ts`.
 */
const MAP_SRC = "/images/world-map-natural-earth.svg";

export default function WorldMapSection() {
  const uid = useId().replace(/:/g, "");
  const mapClipId = `worldMapMapClip-${uid}`;

  const coordsById = useMemo(() => {
    const coords = new Map<string, MapPoint>();
    for (const p of worldMapPoints) {
      coords.set(p.id, projectLatLng(p.lat, p.lng));
    }
    return coords;
  }, []);

  const arcs = useMemo(() => {
    return worldMapConnections
      .map((c, index) => {
        const a = coordsById.get(c.from);
        const b = coordsById.get(c.to);
        if (!a || !b) return null;
        return { index, d: arcPathD(a, b, 0.34) };
      })
      .filter((x): x is { index: number; d: string } => x != null);
  }, [coordsById]);

  return (
    <section
      className={styles.section}
      aria-labelledby="world-map-heading"
      aria-label="Global presence map"
    >
      <div className={styles.inner}>
        <div className={styles.svgWrap}>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${MAP_FRAME_WIDTH} ${MAP_FRAME_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-hidden
          >
            <defs>
              <clipPath id={mapClipId} clipPathUnits="userSpaceOnUse">
                <rect x={MAP_IMG_X} y={MAP_IMG_Y} width={MAP_IMG_W} height={MAP_IMG_H} />
              </clipPath>
              <filter
                id={`worldMapNodeGlow-${uid}`}
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g clipPath={`url(#${mapClipId})`}>
              <image
                className={styles.mapImage}
                href={MAP_SRC}
                x={MAP_IMG_X}
                y={MAP_IMG_Y}
                width={MAP_IMG_W}
                height={MAP_IMG_H}
                preserveAspectRatio="xMidYMid slice"
              />
            </g>

            <g className={styles.arcs}>
              {arcs.map(({ d, index }) => (
                <path
                  key={`arc-base-${index}`}
                  className={styles.arcBase}
                  d={d}
                  fill="none"
                  pathLength={100}
                />
              ))}
              {arcs.map(({ d, index }) => (
                <path
                  key={`arc-flow-${index}`}
                  className={styles.arcFlow}
                  d={d}
                  fill="none"
                  pathLength={100}
                  style={{ animationDelay: `${index * 0.45}s` }}
                />
              ))}
            </g>

            <g className={styles.nodes}>
              {worldMapPoints.map((p) => {
                const { x, y } = coordsById.get(p.id) ?? { x: 0, y: 0 };
                return (
                  <g key={p.id} className={styles.node} transform={`translate(${x}, ${y})`}>
                    <text className={styles.nodeLabel} x={0} y={-10} textAnchor="middle">
                      {p.label}
                    </text>
                    <circle
                      className={styles.nodeDotOuter}
                      r={6}
                      cx={0}
                      cy={0}
                      filter={`url(#worldMapNodeGlow-${uid})`}
                    />
                    <circle className={styles.nodeDot} r={3.2} cx={0} cy={0} />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <p className={styles.mapCredit}>
          Country boundaries: Natural Earth–style map (CC BY 4.0,{" "}
          <a
            href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/world"
            rel="noopener noreferrer"
          >
            svg-maps/world
          </a>
          ).
        </p>

        <h2 id="world-map-heading" className={styles.headline}>
          Whatever your path, we are here for you!
        </h2>
      </div>
    </section>
  );
}
