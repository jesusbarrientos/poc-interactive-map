import { PropsWithChildren, useState } from "react";
import { Map, Marker } from "mapbox-gl";

import { MapContext } from "./context";

interface MapContextProviderProps {
  map: Map | null
  isLoaded: boolean
}

export const MapContextProvider = ({ map, isLoaded, children }: PropsWithChildren<MapContextProviderProps>) => {
  const [markersInView, setMarkersInView] = useState<Marker[]>([])
  const [clusters, setClusters] = useState<Marker[]>([])

  const addMarkerToDisplay = (marker: Marker) => {
    setMarkersInView([...markersInView, marker])
  }

  return (
    <MapContext.Provider value={{ map, isLoaded, markersInView, clusters, addMarkerToDisplay, setClusters }}>
      {children}
    </MapContext.Provider>
  )
}


