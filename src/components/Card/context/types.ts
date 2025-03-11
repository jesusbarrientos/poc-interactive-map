import {ReactNode} from "react";

export interface CardContextValue {
    setContent: (content: ReactNode) => void;
    setVisibility: (visibility: boolean) => void;
}