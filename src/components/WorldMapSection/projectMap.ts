/** Figma frame + map image rect (node 1774:3377 / child 1774:3378). */

export const MAP_FRAME_WIDTH = 1728;
export const MAP_FRAME_HEIGHT = 961;

/** Raster / vector map sits inside the frame (matches Figma layout). */
export const MAP_IMG_X = 226;
export const MAP_IMG_Y = 0;
export const MAP_IMG_W = 1282;
export const MAP_IMG_H = 846;

/**
 * ViewBox of `public/images/world-map-natural-earth.svg` (Natural Earth–style countries).
 * If you swap in another export (e.g. Smashing/Kartograph 1000×647), update these to match.
 */
export const MAP_SOURCE_VIEW_W = 1010;
export const MAP_SOURCE_VIEW_H = 666;

/** Equirectangular latitude span (bottom clipped so Antarctica stays off-map). */
export const LAT_TOP = 90;
export const LAT_BOTTOM = -56;

export type MapPoint = { x: number; y: number };

/** Project WGS84 lat/lng into the homepage SVG (full 1728×961 frame). */
export function projectLatLng(lat: number, lng: number): MapPoint {
  const sx = ((lng + 180) / 360) * MAP_SOURCE_VIEW_W;
  const sy = ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * MAP_SOURCE_VIEW_H;
  return {
    x: MAP_IMG_X + (sx / MAP_SOURCE_VIEW_W) * MAP_IMG_W,
    y: MAP_IMG_Y + (sy / MAP_SOURCE_VIEW_H) * MAP_IMG_H,
  };
}

/**
 * Quadratic curve through a control point lifted perpendicular to the chord (Aceternity-style arc on flat map).
 */
export function arcPathD(a: MapPoint, b: MapPoint, bendFactor = 0.35): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const lift = len * bendFactor;
  const cx = mx + nx * lift;
  const cy = my + ny * lift;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}
