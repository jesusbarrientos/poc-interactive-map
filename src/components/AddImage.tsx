import {useMap} from "./core/useMap.ts";
import {useEffect} from "react";

type Props = {
  id: string;
  src: string;
}

export const AddImage = ({ id, src }: Props) => {
  const {map, isLoaded} = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.loadImage(src, (error, image) => {
      if (error) throw error;
      map.addImage(id, image!);
    });

    return () => {
      map?.removeImage(id);
    }
  }, [id, map, src, isLoaded]);

  return null;
}