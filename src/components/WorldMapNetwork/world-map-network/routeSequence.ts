import * as d3 from "d3";
import styles from "../WorldMapNetwork.module.css";
import type { MapRoute, RuntimeState } from "./types";

export type RouteSequenceOptions = {
  activeRoutes: number;
  routeDuration: number;
  routeDurationJitter: number;
  routeDestinationHold: number;
  routeFadeDuration: number;
};

export function stopRouteSequence(state: RuntimeState | null) {
  if (!state) return;

  state.timers.forEach((timer) => window.clearTimeout(timer));
  state.timers = [];
  state.token = Symbol("stopped-route-sequence");
}

export function startRouteSequence(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  options: RouteSequenceOptions,
) {
  const state: RuntimeState = {
    token: Symbol("route-sequence"),
    timers: [],
    activeRouteIndexes: new Set(),
    pendingRouteIndexes: new Set(),
    recentRouteIndexes: [],
  };
  const paths = svg.select(`.${styles.routeFlows}`).selectAll<SVGPathElement, MapRoute>("path").nodes();

  paths.forEach((path) => {
    const length = path.getTotalLength();
    d3.select(path)
      .interrupt()
      .attr("stroke-dasharray", `${length} ${length}`)
      .attr("stroke-dashoffset", length)
      .style("opacity", 0);
  });

  function pickNextRouteIndex() {
    const recent = new Set(state.recentRouteIndexes.slice(-4));
    const inactive = paths
      .map((_, index) => index)
      .filter((index) => !state.activeRouteIndexes.has(index) && !state.pendingRouteIndexes.has(index));
    const fresh = inactive.filter((index) => !recent.has(index));
    const candidates = fresh.length ? fresh : inactive;

    return candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : null;
  }

  function rememberRoute(routeIndex: number) {
    state.recentRouteIndexes.push(routeIndex);
    state.recentRouteIndexes = state.recentRouteIndexes.slice(-7);
  }

  function scheduleRoute(delay = 0) {
    const routeIndex = pickNextRouteIndex();
    if (routeIndex === null) return;

    state.pendingRouteIndexes.add(routeIndex);

    const timer = window.setTimeout(() => {
      const path = paths[routeIndex];
      const pathSelection = d3.select(path);
      const pathLength = path.getTotalLength();
      const jitter = Math.floor(Math.random() * options.routeDurationJitter);

      state.pendingRouteIndexes.delete(routeIndex);
      state.activeRouteIndexes.add(routeIndex);
      rememberRoute(routeIndex);

      pathSelection
        .interrupt()
        .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
        .attr("stroke-dashoffset", pathLength)
        .attr("data-route-state", "drawing")
        .style("opacity", 0.98)
        .transition()
        .duration(options.routeDuration + jitter)
        .ease(d3.easeCubicInOut)
        .attr("stroke-dashoffset", 0)
        .on("end", function markDestinationHold() {
          d3.select(this).attr("data-route-state", "holding");
        })
        .transition()
        .delay(options.routeDestinationHold)
        .duration(options.routeFadeDuration)
        .attr("data-route-state", "vanishing")
        .style("opacity", 0)
        .transition()
        .duration(1)
        .attr("stroke-dashoffset", pathLength)
        .attr("data-route-state", "queued")
        .on("end", () => {
          state.activeRouteIndexes.delete(routeIndex);
          maintainActiveRoutes();
        });
    }, delay);

    state.timers.push(timer);
  }

  function maintainActiveRoutes() {
    const target = Math.min(options.activeRoutes, paths.length);
    const queuedCount = state.activeRouteIndexes.size + state.pendingRouteIndexes.size;
    const missing = Math.max(0, target - queuedCount);

    for (let index = 0; index < missing; index += 1) {
      scheduleRoute(index * (220 + Math.floor(Math.random() * 260)));
    }
  }

  maintainActiveRoutes();
  return state;
}
