import { GeoJSONFeature } from "mapbox-gl";
import { ElementCreator } from "./types";

export const getFeaturesByType = (features: GeoJSONFeature[]) => {
    const response = features.reduce<{ clusters: GeoJSONFeature[], markers: GeoJSONFeature[] }>((acc, feature) => {
        const isCluster = feature.properties?.cluster_id

        if (isCluster) {
            feature.properties.id = feature.properties?.cluster_id
            acc.clusters.push(feature)
        } else {
            acc.markers.push(feature)
        }


        return acc
    }, { clusters: [], markers: [] })

    return response
}

export const createClusterNode: ElementCreator = ({ point_count }) => {
    const fontSize = point_count >= 3 ? 42 : 16;
    const r = point_count >= 3 ? 50 : 18;
    const r0 = Math.round(r * 0.6);
    const w = r * 2;

    const el = document.createElement('div');
    el.innerHTML = `<div>
      <svg width="${w}" height="${w}" viewbox="0 0 ${w} ${w}" text-anchor="middle" style="font: ${fontSize}px sans-serif; display: block">
        <circle cx="${r}" cy="${r}" r="${r0}" fill="white" />
        <text dominant-baseline="central" transform="translate(${r}, ${r})">
            ${point_count.toLocaleString()}
        </text>
      </svg>
    </div>`;

    return el;
}

export const createMarkerNode: ElementCreator = () => {
    const element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundColor = `#000`;
    element.style.width = `20px`;
    element.style.height = `20px`;
    element.style.backgroundSize = '100%';
    element.style.display = 'block';
    element.style.border = 'none';
    element.style.borderRadius = '50%';
    element.style.cursor = 'pointer';
    element.style.padding = "0";

    element.addEventListener('click', () => {
        window.alert("marker.properties.message");
    });

    return element;
}

// export const createMarkerNode: ElementCreator = () => {
//     const element = document.createElement('div');
//     element.className = 'marker';
//     element.style.backgroundColor = `#000`;
//     element.style.width = `20px`;
//     element.style.height = `20px`;
//     element.style.backgroundSize = '100%';
//     element.style.display = 'block';
//     element.style.border = 'none';
//     element.style.borderRadius = '50%';
//     element.style.cursor = 'pointer';
//     element.style.padding = "0";

//     element.addEventListener('click', () => {
//         window.alert("marker.properties.message");
//     });

//     return element;
// }