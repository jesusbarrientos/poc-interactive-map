import {CardContext} from "./context.ts";
import {ReactNode, useState} from "react";
import {Card} from "../Card.tsx";

type CardContextProviderProps = {
  children: ReactNode
}

export const CardContextProvider = ({ children }: CardContextProviderProps) => {
  const [ visibility, setVisibility ] = useState<boolean>(false)
  const [ content, setContent ] = useState<ReactNode>(null)

  return (
    <CardContext.Provider value={{ setContent, setVisibility }}>
      {children}

      {visibility && (
        <Card>
          {content}
        </Card>
      )}
    </CardContext.Provider>
  )
}


