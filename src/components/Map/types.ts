import { GeoJSONFeature, Map } from "mapbox-gl"

export type MarkersList = Record<string, GeoJSONFeature>

export interface MapContextValue {
    map: Map | null;
    isLoaded: boolean;
}