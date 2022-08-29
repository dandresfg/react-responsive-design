import { createContext, useMemo } from "react";
import { ReactChildren } from "../common/types";
import useBreakpoint from "../hooks/useMediaBreakpoint";
import isBreakpointList from "../utils/validations/isBreakpointList";
import breakpointsDefinitions, { breakpointOptions } from "./breakpointOptions";
import { breakpoint, breakpointList, defaultBreakpoints } from "./breakpoints";

interface IThemeProps extends ReactChildren {
  breakpoints?: breakpointOptions | breakpointList;
}

export const MediaContext = createContext<breakpoint>("" as breakpoint);

function MediaProvider(props: IThemeProps) {
  const getBreakpointList = useMemo<breakpointList>(() => {
    if (props.breakpoints) {
      if (!isBreakpointList(props.breakpoints)) {
        if (typeof props.breakpoints != "string") {
          console.warn(
            "You didn't provide a correct breakpoint option or object. Default breakpoints will be setted."
          );
        }
        return (
          breakpointsDefinitions[props.breakpoints] ||
          breakpointsDefinitions["material"]
        );
      } else return props.breakpoints;
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
