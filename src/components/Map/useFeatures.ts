import { useRef, useState } from "react";
import {  GeoJSONFeature } from "mapbox-gl";

import {  MarkersList } from "./types";

export const useFeatures = ({ idprefix }: { idprefix: string}) => {
    const [featuresCurrentlyDisplayed, setFeaturesCurrentlyDisplayed] = useState<MarkersList>({});
    const debounce = useRef<number | null>(null)

    const updateFeatures = ({ features }: { features: GeoJSONFeature[] }) => {
        if(debounce.current) clearTimeout(debounce.current)

        debounce.current = setTimeout(() => {
            const clonedState = JSON.parse(JSON.stringify(featuresCurrentlyDisplayed))
            const newState: MarkersList = Object.entries(clonedState).reduce(((acc, [id, feature]) => {
                feature.properties.visible = false
                return { ...acc, [id]: feature}
            }), {})

            const additions = features.reduce(((acc, feature) => {
                feature.properties.visible = true
                return { ...acc, [idprefix+feature.properties?.id]: feature}
            }), {})

            const newVal = { ...newState, ...additions }

            JSON.stringify(newVal)

            if(JSON.stringify(newVal) !== JSON.stringify(featuresCurrentlyDisplayed)) setFeaturesCurrentlyDisplayed(newVal);

            // const featuresToAdd: MarkersList = {};

            // features.forEach(feature => {
            //     const id = feature.properties?.id;
            //     if(featuresCurrentlyDisplayed[id]) return
            //     feature.properties.visible = true
            //     featuresToAdd[id] = feature
            // })

            // if(Object.keys(featuresToAdd).length) setFeaturesCurrentlyDisplayed({ ...featuresCurrentlyDisplayed, ...featuresToAdd});
            
        }, 10)
    }

    return {
        updateFeatures,
        featuresCurrentlyDisplayed
    }
}