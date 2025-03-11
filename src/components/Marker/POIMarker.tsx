import styles from "./POIMarker.module.scss";
import {useState} from "react";
import {useCard} from "../Card/context/useCard.ts";

export const POIMarker = () => {
  const { setContent, setVisibility } = useCard();
  const [showPopup, setShowPopup] = useState(false);

  const setCardContent = () => {
    setContent(
      <p>Contenido custom de la card.</p>
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