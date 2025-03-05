import {useEffect} from "react";
import {GeolocateControl} from "mapbox-gl";
import {useMap} from "./core/useMap.ts";

export const Geolocation = () => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geolocate);

    return () => {
      map.removeControl(geolocate);
    }
  }, [map, isLoaded]);

  return null;
}