import { breakpointList } from "./breakpoints";

export type breakpointOptions =
  // | "ant-design"
  "bootstrap" | "bulma" | "chakra" | "material" | "tailwind";

type BreakpointsDefinitions = {
  [key: string]: breakpointList;
};

const breakpointsDefinitions: BreakpointsDefinitions = {
  // "ant-desing": {  This might break anything else
  //   xs: '480px',
  //   sm: '576px',
  //   md: '768px',
  //   lg: '992px',
  //   xl: '1200px',
  //   2xl: '1600px',
  // },
  bootstrap: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    "2xl": 1400,
  },
  bulma: {
    xs: 0,
    sm: 768,
    md: 1024,
    lg: 1216,
    xl: 1408,
  },
  chakra: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1280,
    "2xl": 1536,
  },
  material: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  tailwind: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
};

export default breakpointsDefinitions;
