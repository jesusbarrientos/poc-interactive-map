import {useEffect} from "react";
import {GeolocateControl} from "mapbox-gl";
import {useMap} from "../Map/context/useMap.ts";

export const GeolocationControl = () => {
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