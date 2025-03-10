
import { useEffect, useRef, useState } from 'react';
import { Map, NavigationControl } from 'mapbox-gl';

import { MapContextProvider } from './context';
import { MapView } from './Map.view';

export const MapController = () => {
    const mapInstance = useRef<Map>(null);
    const mapContainer = useRef<HTMLDivElement>(null);

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const map = new Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v12', // streets-v12   dark-v11
            center: [39, 22.59],
            zoom: 4,
        })

        mapInstance.current = map

        map.addControl(new NavigationControl());

        map.on('load', () => {
            setIsLoaded(true)
            map.addSource('earthquakes', {
                'type': 'geojson',
                'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                'cluster': true,
                'clusterRadius': 80,
            });

            map.addLayer({
                'id': 'earthquake_circle',
                'type': 'circle',
                'source': 'earthquakes',
                'paint': {
                    'circle-opacity': 0
                }
            });
        });

        return () => { map.remove() };
    }, []);

    return (
        <MapContextProvider map={mapInstance.current} isLoaded={isLoaded}>
            <MapView ref={mapContainer} />
        </MapContextProvider>
    )
}