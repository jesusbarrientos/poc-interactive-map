import { useContext } from "react"
import {CardContext} from "./context.ts";
import {CardContextValue} from "./types.ts";

export const useCard = () => {
  return useContext<CardContextValue>(CardContext)
}