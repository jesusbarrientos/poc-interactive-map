import { PropsWithChildren, useEffect, useRef } from "react";
import { Marker } from "mapbox-gl";

import { useMap } from "../Map/context/useMap";

interface CustomMarkerProps {
    coordinates: [number, number]
    isVisible: boolean
}

export const CustomMarker = ({ coordinates, isVisible, children }: PropsWithChildren<CustomMarkerProps>) => {
    const { map } = useMap()
    const element = useRef<HTMLDivElement>(null);
    const ref = useRef<Marker>(null);

    useEffect(() => {
        if (map && ref.current) {
            if (isVisible) {
                ref.current.addTo(map)
            } else {
                ref.current.remove()
            }
        }
    }, [isVisible, map])

    useEffect(() => {
        if (!element.current || !map) return;

        const marker = new Marker({ element: element.current }).setLngLat(coordinates).addTo(map)
        ref.current = marker

        return () => { marker.remove() }
    }, []);

    return <div ref={element}>{children}</div>
}