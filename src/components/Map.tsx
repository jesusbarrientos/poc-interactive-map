import {createContext, ReactNode, useEffect, useRef, useState} from "react";
import mapboxgl, {SourceSpecification} from 'mapbox-gl';
import {MapStyle} from "./core/MapStyle.ts";
import styles from './Map.module.scss';

// Modified context to include both the map and its loading state
interface MapContextValue {
  map: mapboxgl.Map | null;
  isLoaded: boolean;
}

export const MapContext = createContext<MapContextValue>({
  map: null,
  isLoaded: false
});

export type MapProps<TSource extends SourceSpecification = SourceSpecification> = {
  children?: ReactNode;
  style?: MapStyle;
  source?: {id: string, data: TSource}[];
}

export const Map = (props: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Map initialization
  useEffect(() => {
    if (!mapContainer.current || map) return;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: props.style?.style || MapStyle.STREETS_V12.style,
      center: [-74.5, 40],
      zoom: 9,
    });

    // Capture the load event
    newMap.on('load', () => setIsLoaded(true));

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  // Map style change
  useEffect(() => {
    if (!map || !isLoaded || !props.style) return;

    map.setStyle(props.style.style || MapStyle.STREETS_V12.style);

    // Reset isLoaded when style changes
    setIsLoaded(false);

    // Listen for the load event again when style changes
    const styleLoadListener = () => setIsLoaded(true);

    map.on('styledata', styleLoadListener);

    return () => {
      map.off('styledata', styleLoadListener);
    };
  }, [map, props.style, isLoaded]);

  // Add source
  useEffect(() => {
    if (!map || !isLoaded || !props.source) return;

    props.source.forEach(({ id, data }) => {
      map.addSource(id, data);
    });

    return () => {
      props.source?.forEach(({ id }) => {
        map.removeSource(id);
      });
    };
  }, [map, isLoaded, props.source]);

  return (
    <MapContext.Provider value={{ map, isLoaded }}>
      <div ref={mapContainer} className={styles.map}>
        {props.children}
      </div>
    </MapContext.Provider>
  )
}