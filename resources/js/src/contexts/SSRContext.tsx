import { createContext, useContext } from "react";

export const SSRContext = createContext<any>({});
export const useSSRContext = () => useContext(SSRContext);
