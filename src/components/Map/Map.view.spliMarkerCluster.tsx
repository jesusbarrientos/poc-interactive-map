import { forwardRef, useEffect } from "react";

import styles from './Map.module.scss';
import { useFeatures } from './useFeatures';
import { getFeaturesByType } from './utils';
import { useMap } from './context/useMap';
import { CustomMarker } from "../CustomMarker/CustomMarker";

export const MapView = forwardRef<HTMLDivElement>((_, mapContainerRef) => {
  const { isLoaded, map } = useMap()

  const { updateFeatures: updateClusters, featuresCurrentlyDisplayed: clusters } = useFeatures({ idprefix: "cl" })
  const { updateFeatures: updateMarkers, featuresCurrentlyDisplayed: markers } = useFeatures({ idprefix: "mk" })

  useEffect(() => {
    if (!map || !isLoaded) return

    map.on('render', () => {
      if (!map.isSourceLoaded('earthquakes')) return;

      const features = map.querySourceFeatures('earthquakes');
      const { clusters, markers } = getFeaturesByType(features)

      updateClusters({ features: clusters });
      updateMarkers({ features: markers });
    });

  }, [isLoaded, map, updateClusters, updateMarkers])

  return (<>

    {isLoaded && Object.values(markers).map((data) => {
      return <CustomMarker key={data.properties.id} isVisible={data.properties?.visible} coordinates={data.geometry.coordinates}>
        <div className={styles.marker}></div>
      </CustomMarker>
    })}

    {/* {isLoaded && Object.values(clusters).map((data) => {
      return <CustomMarker key={data.properties.id} isVisible={data.properties?.visible} coordinates={data.geometry.coordinates}>
        <div className={styles.cluster} >{data.properties.point_count}</div>
      </CustomMarker>
    })} */}


    <div ref={mapContainerRef} className={styles.map}>
    </div>
  </>
  )
})