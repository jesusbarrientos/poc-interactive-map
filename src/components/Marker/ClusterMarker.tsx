import styles from "./ClusterMarker.module.scss";

type ClusterMarkerProps = {
  children: number;
}

export const ClusterMarker = ({ children }: ClusterMarkerProps) => {
  return (
    <div className={styles.marker} onClick={() => { console.log("Paso")}}>
      {children}
    </div>
  )
}