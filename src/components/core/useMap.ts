import {useContext} from "react";
import {MapContext} from "../Map.tsx";

export const useMap = () => {
  return useContext(MapContext)
}