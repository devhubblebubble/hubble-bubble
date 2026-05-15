import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import styles from "../WorldMapNetwork.module.css";
import { projectedRoute, routeKey, type GeoObject } from "./geometry";
import { startRouteSequence, stopRouteSequence } from "./routeSequence";
import type { MapLocation, MapRoute, RuntimeState } from "./types";

export type UseWorldMapRendererOptions = {
  dataUrl: string;
  locations: MapLocation[];
  routes: MapRoute[];
  headline: string;
  mapScale: number;
  fitPaddingX: number;
  fitPaddingTop: number;
  fitPaddingBottom: number;
  activeRoutes: number;
  routeDuration: number;
  routeDurationJitter: number;
  routeDestinationHold: number;
  routeFadeDuration: number;
};

export function useWorldMapRenderer({
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
}: UseWorldMapRendererOptions) {
  const rootRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const runtimeRef = useRef<RuntimeState | null>(null);
  const locationsById = useMemo(() => new Map(locations.map((location) => [location.id, location])), [locations]);

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    async function draw() {
      const root = rootRef.current;
      const svgNode = svgRef.current;
      if (!root || !svgNode) return;

      const world = await d3.json(dataUrl);
      if (cancelled || !world) return;

      const svg = d3.select(svgNode);
      const width = Math.max(root.clientWidth, 320);
      const rootHeight = root.clientHeight || window.innerHeight || Math.round(width * 0.5);
      const svgHeight = Math.max(rootHeight, 320);

      svg.attr("viewBox", `0 0 ${width} ${svgHeight}`).attr("width", width).attr("height", svgHeight);

      const countries = feature(
        world as never,
        (world as { objects: { countries: unknown } }).objects.countries as never,
      ) as unknown as {
        type: "FeatureCollection";
        features: GeoObject[];
      };
      const visibleCountries = {
        type: "FeatureCollection" as const,
        features: countries.features.filter((country) => d3.geoCentroid(country)[1] > -58),
      };
      const horizontalPadding = Math.max(0, Math.min(width * fitPaddingX, width * 0.45));
      const projection = d3.geoMercator().fitExtent(
        [
          [horizontalPadding, Math.max(0, fitPaddingTop)],
          [width - horizontalPadding, svgHeight - Math.max(0, fitPaddingBottom)],
        ],
        visibleCountries as unknown as GeoObject,
      );
      // Scale from the visual centre of the fit extent, not from SVG origin.
      // Overriding translate with [w/2, h/2] places 0°/0° at centre (wrong).
      const [tx, ty] = projection.translate();
      const cx = width / 2;
      const cy = (Math.max(0, fitPaddingTop) + svgHeight - Math.max(0, fitPaddingBottom)) / 2;
      projection.scale(projection.scale() * mapScale);
      projection.translate([
        cx + mapScale * (tx - cx),
        cy + mapScale * (ty - cy),
      ]);
      const path = d3.geoPath(projection);

      svg
        .select(`.${styles.countries}`)
        .selectAll("path")
        .data(visibleCountries.features)
        .join("path")
        .attr("d", (country) => path(country));
      svg.select(`.${styles.borders}`).selectAll("path").data([]).join("path");
      svg
        .select(`.${styles.routes}`)
        .selectAll<SVGPathElement, MapRoute>("path")
        .data(routes, routeKey)
        .join("path")
        .attr("d", (route) => {
          const source = locationsById.get(route[0]);
          const target = locationsById.get(route[1]);
          return source && target ? projectedRoute(source, target, projection) : "";
        });
      svg
        .select(`.${styles.routeFlows}`)
        .selectAll<SVGPathElement, MapRoute>("path")
        .data(routes, routeKey)
        .join("path")
        .attr("d", (route) => {
          const source = locationsById.get(route[0]);
          const target = locationsById.get(route[1]);
          return source && target ? projectedRoute(source, target, projection) : "";
        });

      const locationGroups = svg
        .select(`.${styles.points}`)
        .selectAll<SVGGElement, MapLocation>("g")
        .data(locations, (location) => location.id)
        .join((enter) => {
          const group = enter.append("g");
          group.append("circle").attr("class", styles.markerHalo).attr("r", 7);
          group.append("circle").attr("class", styles.markerRing).attr("r", 5);
          group.append("circle").attr("class", styles.markerDot).attr("r", 2.6);
          group.append("text").attr("class", styles.label);
          return group;
        })
        .attr("transform", (location) => `translate(${projection(location.coordinates)?.join(",")})`);

      locationGroups
        .select("text")
        .attr("x", (location) => location.labelOffset?.[0] ?? 0)
        .attr("y", (location) => location.labelOffset?.[1] ?? -12)
        .text((location) => location.label);

      svg
        .selectAll(`.${styles.headline}`)
        .data(headline ? [headline] : [])
        .join("text")
        .attr("class", styles.headline)
        .attr("x", width / 2)
        .attr("y", svgHeight - 20)
        .text((text) => text);

      stopRouteSequence(runtimeRef.current);
      runtimeRef.current = startRouteSequence(svg, {
        activeRoutes,
        routeDuration,
        routeDurationJitter,
        routeDestinationHold,
        routeFadeDuration,
      });
    }

    draw();
    if (rootRef.current) {
      resizeObserver = new ResizeObserver(draw);
      resizeObserver.observe(rootRef.current);
    }

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      stopRouteSequence(runtimeRef.current);
    };
  }, [
    activeRoutes,
    dataUrl,
    fitPaddingBottom,
    fitPaddingTop,
    fitPaddingX,
    headline,
    locations,
    locationsById,
    mapScale,
    routeDestinationHold,
    routeDuration,
    routeDurationJitter,
    routeFadeDuration,
    routes,
  ]);

  return { rootRef, svgRef };
}
