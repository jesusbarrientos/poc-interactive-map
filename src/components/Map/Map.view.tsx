import { forwardRef, useEffect } from "react";

import styles from './Map.module.scss';
import { useFeatures } from './useFeatures';
import { useMap } from './context/useMap';
import { MarkerContainer } from "../Marker/MarkerContainer.tsx";
import {POIMarker} from "../Marker/POIMarker.tsx";
import {ClusterMarker} from "../Marker/ClusterMarker.tsx";
import {CardContextProvider} from "../Card/context";

export const MapView = forwardRef<HTMLDivElement>((_, mapContainerRef) => {
  const { isLoaded, map } = useMap()

  const { updateFeatures, featuresCurrentlyDisplayed } = useFeatures({ idprefix: "cl" })

  // TODO: should this logic be on the controller
  useEffect(() => {
    if (!map || !isLoaded) return

    map.on('render', () => {
      if (!map.isSourceLoaded('earthquakes')) return;

      const features = map.querySourceFeatures('earthquakes');
      const mapped = features.map(feat => {
        const isCluster = feat.properties?.cluster_id

        if (isCluster && feat.properties) {
          feat.properties.id = feat.properties?.cluster_id
        }

        return feat
      })

      updateFeatures({ features: mapped });
    });

  }, [isLoaded, map, updateFeatures])

  return (
    <div ref={mapContainerRef} className={styles.map}>
      <CardContextProvider>
        {isLoaded && Object.values(featuresCurrentlyDisplayed).map((data) => {
          return (
            <MarkerContainer
              key={data.properties?.id}
              isVisible={data.properties?.visible}
              coordinates={data.geometry.coordinates}
            >
              {data.properties?.cluster ?
                <ClusterMarker>{data.properties.point_count}</ClusterMarker>
                :
                <POIMarker/>
              }
            </MarkerContainer>
          )
        })}
      </CardContextProvider>
    </div>
  )
})