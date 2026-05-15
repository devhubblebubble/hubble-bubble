import type { MapLocation, MapRoute } from "./types";

export const defaultLocations: MapLocation[] = [
  { id: "canada", label: "Canada", coordinates: [-106.3468, 56.1304], labelOffset: [-12, -14] },
  { id: "usa", label: "USA", coordinates: [-98.5795, 39.8283], labelOffset: [-2, -14] },
  { id: "argentina", label: "Argentina", coordinates: [-63.6167, -38.4161], labelOffset: [-16, -14] },
  { id: "south-africa", label: "South Africa", coordinates: [22.9375, -30.5595], labelOffset: [-18, -14] },
  { id: "uk", label: "UK", coordinates: [-3.436, 55.3781], labelOffset: [-2, -15] },
  { id: "germany", label: "Germany", coordinates: [10.4515, 51.1657], labelOffset: [-12, -15] },
  { id: "romania", label: "Romania", coordinates: [24.9668, 45.9432], labelOffset: [-8, -15] },
  { id: "uae", label: "UAE", coordinates: [53.8478, 23.4241], labelOffset: [-6, -15], hub: true },
  { id: "india", label: "India", coordinates: [78.9629, 20.5937], labelOffset: [2, -15] },
  { id: "china", label: "China", coordinates: [104.1954, 35.8617], labelOffset: [-4, -15] },
  { id: "russia", label: "Russia", coordinates: [105.3188, 61.524], labelOffset: [-18, -15] },
  { id: "australia", label: "Australia", coordinates: [133.7751, -25.2744], labelOffset: [-20, -15] },
];

export const defaultRoutes: MapRoute[] = [
  ["canada", "uae"],
  ["usa", "uae"],
  ["argentina", "uae"],
  ["south-africa", "uae"],
  ["uk", "uae"],
  ["germany", "uae"],
  ["romania", "uae"],
  ["india", "uae"],
  ["china", "uae"],
  ["russia", "uae"],
  ["australia", "uae"],
  ["usa", "russia"],
  ["uk", "india"],
  ["russia", "uk"],
  ["argentina", "romania"],
  ["germany", "india"],
  ["usa", "germany"],
];
