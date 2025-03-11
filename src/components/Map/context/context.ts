import { createContext } from "react";
import { MapContextValue } from "../types";

export const MapContext = createContext<MapContextValue>({
  map: null,
  isLoaded: false,
});