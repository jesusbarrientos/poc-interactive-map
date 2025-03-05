import {useEffect, useRef} from "react";
import {Marker} from "mapbox-gl";
import {useMap} from "../components/core/useMap.ts";
import styles from './PinMarker.module.scss';

type Props = {
  lat: number;
  lng: number;
  properties?: {
    name: string;
    category: string;
    subCategory: string;
  };
}

export const PinMarker = ({ lat, lng }: Props) => {
  const { map, isLoaded } = useMap();
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!map || !isLoaded || !element.current) return;

    const marker = new Marker({
      element: element.current
    })
      .setLngLat([lng, lat])
      .addTo(map!);

    return () => {
      marker.remove();
    }
  }, [map, lng, lat, isLoaded, element.current]);

  return (
    <div ref={element} className={styles.pinMarker} />
  )
}