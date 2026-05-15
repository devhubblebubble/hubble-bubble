export type MapLocation = {
  id: string;
  label: string;
  coordinates: [number, number];
  labelOffset?: [number, number];
  hub?: boolean;
};

export type MapRoute = [string, string];

export type WorldMapNetworkProps = {
  /** Use inside a flex layout parent; renders a `div` + fills slot instead of a standalone full-viewport `section`. */
  embedded?: boolean;
  className?: string;
  dataUrl?: string;
  locations?: MapLocation[];
  routes?: MapRoute[];
  headline?: string;
  height?: number | string;
  minHeight?: number | string;
  mapScale?: number;
  fitPaddingX?: number;
  fitPaddingTop?: number;
  fitPaddingBottom?: number;
  activeRoutes?: number;
  routeDuration?: number;
  routeDurationJitter?: number;
  routeDestinationHold?: number;
  routeFadeDuration?: number;
};

export type RuntimeState = {
  token: symbol;
  timers: number[];
  activeRouteIndexes: Set<number>;
  pendingRouteIndexes: Set<number>;
  recentRouteIndexes: number[];
};
