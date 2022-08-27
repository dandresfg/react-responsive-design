import { createContext, useMemo } from "react";
import { ReactChildren } from "../common/types";
import useBreakpoint from "../hooks/useMediaBreakpoint";
import breakpointsDefinitions, { breakpointOptions } from "./breakpointOptions";
import { breakpoint, breakpointList, defaultBreakpoints } from "./breakpoints";

interface IThemeProps extends ReactChildren {
  breakpoints?: breakpointOptions | breakpointList;
}

export const MediaContext = createContext<breakpoint>("" as breakpoint);

function MediaProvider(props: IThemeProps) {
  const getBreakpointList = useMemo<breakpointList>(() => {
    if (props.breakpoints) {
      if (typeof props.breakpoints == "string") {
        return (
          breakpointsDefinitions[props.breakpoints] ||
          breakpointsDefinitions["material"]
        );
      }
      //Here should go a validation for breakpointList
    }

    return breakpointsDefinitions["material"];
  }, [props.breakpoints]);

  const breakpoint = useBreakpoint(getBreakpointList);
  console.log(breakpoint);
  return (
    <MediaContext.Provider value={breakpoint}>
      {props.children}
    </MediaContext.Provider>
  );
}

export default MediaProvider;
