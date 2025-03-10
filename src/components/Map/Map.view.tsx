import { forwardRef, useEffect } from "react";

import styles from './Map.module.scss';
import { useFeatures } from './useFeatures';
import { getFeaturesByType } from './utils';
import { useMap } from './context/useMap';
import { CustomMarker } from "../CustomMarker/CustomMarker";

export const MapView = forwardRef<HTMLDivElement>((_, mapContainerRef) => {
  const { isLoaded, map } = useMap()

  const { updateFeatures, featuresCurrentlyDisplayed } = useFeatures({ idprefix: "cl" })

  useEffect(() => {
    if (!map || !isLoaded) return

    map.on('render', () => {
      if (!map.isSourceLoaded('earthquakes')) return;

      const features = map.querySourceFeatures('earthquakes');
      const mapped = features.map(feat => {
        const isCluster = feat.properties?.cluster_id

        if (isCluster) {
          feat.properties.id = feat.properties?.cluster_id
        }

        return feat
      })
      // const { clusters, markers } = getFeaturesByType(features)

      updateFeatures({ features: mapped });
    });

  }, [isLoaded, map, updateFeatures])

  return (<>
    {isLoaded && Object.values(featuresCurrentlyDisplayed).map((data) => {
      return <CustomMarker key={data.properties.id} isVisible={data.properties?.visible} coordinates={data.geometry.coordinates}>
        {data.properties.cluster ?
          <div className={styles.cluster} >{data.properties.point_count}</div>
          :
          <div className={styles.marker}></div>
        }
      </CustomMarker>
    })}

    <div ref={mapContainerRef} className={styles.map}>
    </div>
  </>
  )
})