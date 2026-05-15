import * as d3 from "d3";
import type { MapLocation, MapRoute } from "./types";

export type GeoObject = Parameters<typeof d3.geoCentroid>[0];

export function routeKey([from, to]: MapRoute) {
  return `${from}-${to}`;
}

export function projectedRoute(source: MapLocation, target: MapLocation, projection: d3.GeoProjection) {
  const [x1, y1] = projection(source.coordinates) ?? [0, 0];
  const [x2, y2] = projection(target.coordinates) ?? [0, 0];
  const distance = Math.hypot(x2 - x1, y2 - y1);
  const lift = Math.max(56, Math.min(300, distance * 0.52));
  const controlX = (x1 + x2) / 2;
  const controlY = Math.min(y1, y2) - lift;

  return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
}
