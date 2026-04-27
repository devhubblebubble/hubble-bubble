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
  { id: "usa", label: "USA", lat: 39.83, lng: -98.58 },
  { id: "argentina", label: "Argentina", lat: -38.42, lng: -63.62 },
  { id: "uk", label: "UK", lat: 54.7, lng: -3.43 },
  { id: "germany", label: "Germany", lat: 51.17, lng: 10.45 },
  { id: "uae", label: "UAE", lat: 23.42, lng: 53.85 },
  { id: "india", label: "India", lat: 22.35, lng: 78.67 },
  { id: "china", label: "China", lat: 35.86, lng: 104.2 },
  { id: "russia", label: "Russia", lat: 61.52, lng: 105.32 },
  { id: "australia", label: "Australia", lat: -25.27, lng: 133.78 },
  { id: "southAfrica", label: "South Africa", lat: -30.56, lng: 22.94 },
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
