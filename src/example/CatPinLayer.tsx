import {useMap} from "../components/core/useMap.ts";
import {useCallback, useEffect, useRef, useState} from "react";
import {MapMouseEvent} from "mapbox-gl";
import {CatDescriptionPopup} from "./CatDescriptionPopup.tsx";

const LAYER_ID = 'points';
const SOURCE_ID = 'points';

type CatData = {
  id: string,
  name: string,
}

export const CatPinLayer = () => {
  const { map, isLoaded } = useMap();
  const hoveredCatId = useRef<string | number | undefined>(undefined)
  const [catData, setCatData] = useState<CatData>();

  const onHover = useCallback((e: MapMouseEvent) => {
    map!.getCanvas().style.cursor = 'pointer';

    const id = e.features?.[0].id;
    hoveredCatId.current = id;

    if (id !== undefined) {
      map!.setFeatureState(
        { source: SOURCE_ID, id },
        { hover: true }
      );

      setCatData({
        id: id.toString(),
        name: e.features?.[0].properties?.name,
      });
    }
  }, [map])

  const onHoverLost = useCallback(() => {
    map!.getCanvas().style.cursor = '';

    if (hoveredCatId.current !== undefined) {
      map!.setFeatureState(
        { source: SOURCE_ID, id: hoveredCatId.current },
        { hover: false }
      );

      hoveredCatId.current = undefined;
      setCatData(undefined);
    }
  }, [map])

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addSource(SOURCE_ID, {
      type: 'geojson',
      generateId: true,
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-74.5, 40]
            },
            properties: {
              name: 'Romeo',
              category: 'cat',
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-75, 40]
            },
            properties: {
              name: 'Juliet',
            }
          }
        ]
      }
    });

    map.loadImage("https://docs.mapbox.com/mapbox-gl-js/assets/cat.png", (error, image) => {
      if (error) throw error;
      map.addImage("cat", image!);

      map.addLayer({
        id: LAYER_ID,
        type: 'symbol',
        source: SOURCE_ID,
        layout: {
          'icon-image': 'cat',
          'icon-size': 0.15,
        },
        paint: {
          'icon-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.7
          ]
        }
      });
    });

    map.on('mouseenter', LAYER_ID, onHover)
    map.on('mouseleave', LAYER_ID, onHoverLost)

    return () => {
      map.removeLayer(LAYER_ID)
      map.removeSource(SOURCE_ID)

      map.off('mouseenter', LAYER_ID, onHover)
      map.off('mouseleave', LAYER_ID, onHoverLost)
    }
  }, [map, isLoaded, onHover, onHoverLost])

  return (
    <CatDescriptionPopup data={catData} />
  );
}