import {ReactNode} from "react";
import style from "./Card.module.scss";
import {useCard} from "./context/useCard.ts";

type CardProps = {
  children: ReactNode
}

export const Card = ({ children }: CardProps) => {
  const { setVisibility } = useCard()

  return (
    <article className={style.card}>
      <button onClick={() => setVisibility(false)}>close</button>
      {children}
    </article>
  )
}