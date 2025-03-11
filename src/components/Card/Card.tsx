import {ReactNode} from "react";
import style from "./Card.module.scss";

type CardProps = {
  children: ReactNode
}

export const Card = ({ children }: CardProps) => {
  return (
    <article className={style.card}>
      {children}
    </article>
  )
}