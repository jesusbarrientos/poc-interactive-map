import { createContext } from "react";
import {CardContextValue} from "./types.ts";

export const CardContext = createContext<CardContextValue>({
  setVisibility: () => {},
  setContent: () => {}
});