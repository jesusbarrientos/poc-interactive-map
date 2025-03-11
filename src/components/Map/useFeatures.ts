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
                (feature as GeoJSONFeature).properties!.visible = false
                return { ...acc, [id]: feature}
            }), {})

            const additions = features.reduce(((acc, feature) => {
                if (feature.properties != null) {
                    feature.properties.visible = true
                }

                return { ...acc, [idprefix+feature.properties?.id]: feature}
            }), {})

            const newVal = { ...newState, ...additions }

            if(JSON.stringify(newVal) !== JSON.stringify(featuresCurrentlyDisplayed)) setFeaturesCurrentlyDisplayed(newVal);
        }, 10)
    }

    return {
        updateFeatures,
        featuresCurrentlyDisplayed
    }
}