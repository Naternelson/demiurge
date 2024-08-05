import { useContext } from "react"
import { ViewportContext } from "./ViewportProvider";
import { ViewportContextType } from "./Viewport.types";

export const useViewport = () => {
  return useContext(ViewportContext) as ViewportContextType;
}