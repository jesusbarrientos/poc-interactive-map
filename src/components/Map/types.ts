import { GeoJSONFeature, Marker, Map } from "mapbox-gl"

export type ElementCreator = (props: GeoJSONFeature["properties"]) => HTMLElement
export type MarkersList = Record<string, GeoJSONFeature>

export interface MapContextValue {
    map: Map | null;
    isLoaded: boolean;
}