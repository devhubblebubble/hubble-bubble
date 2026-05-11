export type WorldMapPoint = {
  id: string;
  label: string;
  lat: number;
  lng: number;
};

export type WorldMapConnection = {
  from: string;
  to: string;
};

/** Hub locations — WGS84 centroids, projected onto the Natural Earth–style SVG. */
export const worldMapPoints: WorldMapPoint[] = [
  { id: "canada", label: "Canada", lat: 56.13, lng: -106.35 },
  { id: "usa", label: "USA", lat: 29.83, lng: -108.58 },
  { id: "argentina", label: "Argentina", lat: -32.0, lng: -71.0 },
  { id: "uk", label: "UK", lat: 33.7, lng: -3.43 },
  { id: "germany", label: "Germany", lat: 45.17, lng: 10.45 },
  { id: "uae", label: "UAE", lat: 13.42, lng: 43.85 },
  { id: "india", label: "India", lat: 1, lng: 68.67 },
  { id: "china", label: "China", lat: 25.86, lng: 104.2 },
  { id: "russia", label: "Russia", lat: 51.52, lng: 105.32 },
  { id: "australia", label: "Australia", lat: -25.27, lng: 133.78 },
  { id: "southAfrica", label: "South Africa", lat: -26.0, lng: 17.0 },
];

/** Arcs aligned with the Figma world-map section (1774:3377). */
export const worldMapConnections: WorldMapConnection[] = [
  { from: "canada", to: "russia" },
  { from: "usa", to: "uk" },
  { from: "argentina", to: "germany" },
  { from: "uk", to: "uae" },
  { from: "germany", to: "india" },
  { from: "china", to: "uae" },
  { from: "southAfrica", to: "australia" },
];
