import {useMap} from "./core/useMap.ts";
import {useEffect} from "react";
import {SourceSpecification} from "mapbox-gl";

type Props = {
  id: string;
  specification: SourceSpecification;
}

export const AddSource = ({ id, specification }: Props) => {
  const {map, isLoaded} = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addSource(id, specification);

    return () => {
      map?.removeSource(id);
    }
  }, [id, map, specification, isLoaded])

  return null;
}