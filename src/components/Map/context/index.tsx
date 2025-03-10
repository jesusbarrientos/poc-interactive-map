import { PropsWithChildren } from "react";
import { Map } from "mapbox-gl";

import { MapContext } from "./context";

interface MapContextProviderProps {
  map: Map | null
  isLoaded: boolean
}

export const MapContextProvider = ({ map, isLoaded, children }: PropsWithChildren<MapContextProviderProps>) => {
  // TODO: here we can add as much data to share as we want
  return (
    <MapContext.Provider value={{ map, isLoaded }}>
      {children}
    </MapContext.Provider>
  )
}


