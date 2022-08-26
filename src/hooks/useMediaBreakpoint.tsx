import { useEffect, useMemo, useState } from "react";
import { breakpoint, breakpointList } from "../theme/breakpoints";

const getBreakpoint = (width: number, breakpoints: breakpointList): breakpoint => {
  // biggest breakpoint
  const greatestbkpt = breakpoints["2xl"] || breakpoints["xl"];

  if (width < breakpoints["sm"]) {
    return "xs";
  } else if (width > greatestbkpt) {
    return breakpoints["2xl"] ? "2xl" : "xl";
  }

  const keys = Object.keys(breakpoints).filter((key) => breakpoints[key as breakpoint] !== undefined);
  const bkpts = keys.slice(1, keys.length - 1).reverse() as breakpoint[];

  for (let i = 0; i < bkpts.length-1; i++) {
    const point: keyof typeof breakpoints = bkpts[i];
    if (width >= (breakpoints[point] as number)) {
      return point;
    }
  }

  // base case
  return bkpts[bkpts.length-1];
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
