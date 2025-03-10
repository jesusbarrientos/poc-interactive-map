import { useContext } from "react"
import { MapContextValue } from "../types"
import { MapContext } from "./context"

export const useMap = () => {
  return useContext<MapContextValue>(MapContext)
}