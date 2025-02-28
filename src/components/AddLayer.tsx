import {useMap} from "./core/useMap.ts";
import {useEffect} from "react";
import {LayerSpecification} from "mapbox-gl";

type Props = {
  specification: LayerSpecification;
}

export const AddLayer = ({ specification }: Props) => {
  const {map, isLoaded} = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addLayer(specification)

    return () => {
      map?.removeLayer(specification.id);
    }
  }, [map, specification, isLoaded]);

  return null;
}