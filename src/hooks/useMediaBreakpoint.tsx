import { useEffect, useMemo, useState } from "react";
import { breakpoint, breakpointList } from "../theme/breakpoints";

const getBreakpoint = (
  width: number,
  breakpoints: breakpointList
): breakpoint => {
  // biggest breakpoint
  const greatestbkpt = breakpoints["2xl"] || breakpoints["xl"];

  if (width < breakpoints["sm"]) {
    return "xs";
  } else if (width > greatestbkpt) {
    return breakpoints["2xl"] ? "2xl" : "xl";
  }

  const keys = Object.keys(breakpoints);
  const bkpts = keys
    .slice(1, breakpoints["2xl"] ? keys.length - 1 : keys.length - 2)
    .reverse();
  for (let i = 0; i < bkpts.length; i++) {
    const point = bkpts[i] as breakpoint;
    if (width > breakpoints[point]) {
      return point;
    }
  }

  // base case
  return "xs";
};

function useMediaBreakpoint(breakpoints: breakpointList) {
  const [width, setWidth] = useState(window.innerWidth);

  const mediabreakpoint = useMemo(() => {
    return getBreakpoint(width, breakpoints);
  }, [breakpoints, width]);

  const onWindowLayerResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", onWindowLayerResize);
    return () => {
      window.removeEventListener("resize", onWindowLayerResize);
    };
    // eslint-disable-next-line
  }, []);

  return mediabreakpoint;
}

export default useMediaBreakpoint;
