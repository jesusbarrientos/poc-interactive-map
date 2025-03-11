import styles from "./POIMarker.module.scss";
import {useState} from "react";
import {useCard} from "../Card/context/useCard.ts";

type POIMarkerProps = {
  properties: { [key: string]: any } | null
}

export const POIMarker = (props: POIMarkerProps) => {
  const { setContent, setVisibility } = useCard();
  const [showPopup, setShowPopup] = useState(false);

  const setCardContent = () => {
    setContent(
      <p>
        <b>Terremoto magnitud:</b> {props.properties?.mag}<br/>
        <b>Tiempo:</b> {props.properties?.time}<br/>
        <b>Tsunami:</b> {props.properties?.tsunami === 0 ? "No" : "Sí"}
      </p>
    )

    setVisibility(true)
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.marker}
        onClick={setCardContent}
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      />

      {showPopup && (
        <article className={styles.popup}>
          Hola mundo!
        </article>
      )}
    </div>
  )
}