import { useRef } from "react";
import { Marker, GeoJSONFeature, Map } from "mapbox-gl";

import { ElementCreator, MarkersList } from "./types";

export const useFeatures = ({ elementCreator }: { elementCreator: ElementCreator}) => {
    const allFeatures = useRef<MarkersList>({}).current;
    const featuresOnPrevFrame = useRef<MarkersList>({});

    const createMarker = ({ feature }: { feature: GeoJSONFeature }) => {
        const { coordinates } = feature.geometry;

        const element = elementCreator(feature.properties)
        const marker = new Marker({ element }).setLngLat(coordinates);

        allFeatures[feature.properties?.id] = marker
        return marker
    }

    const displayMarker = ({ id, marker, map }: { id: string, marker: Marker, map: Map }) => {
        const isMarkerAlreadyPainted = featuresOnPrevFrame.current[id]
        if (!isMarkerAlreadyPainted) marker.addTo(map);
    }

    const hideOutOfViewMarkers = (featuresForNewFrame: MarkersList) => {
        for (const id in featuresOnPrevFrame.current) {
            if (!featuresForNewFrame[id]) featuresOnPrevFrame.current[id].remove();
        }
    }

    const updateFeatures = ({ features, map }: { features: GeoJSONFeature[], map: Map }) => {
        const featuresForNewFrame: MarkersList = {};

        for (const feature of features) {
            const id = feature.properties?.id;
            const marker = featuresForNewFrame[id] = allFeatures[id] || createMarker({ feature })
            displayMarker({ id, marker, map })
        }

        hideOutOfViewMarkers(featuresForNewFrame)
        featuresOnPrevFrame.current = featuresForNewFrame;
    }

    return {
        updateFeatures
    }
}