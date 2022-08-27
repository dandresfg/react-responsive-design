import breakpointsDefinitions from "./breakpointOptions";

export type breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type breakpointList = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl"?: number;
};

export const defaultBreakpoints: breakpointList =
  breakpointsDefinitions["material"];
