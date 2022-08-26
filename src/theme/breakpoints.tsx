export type breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type breakpointList = {
    [point in breakpoint]: number | false
};

export type breakpointOptions = "bootstrap" | "tailwind" | "material"

export const defaultBreakpoints: breakpointList = {
    "xs": 0,
    "sm": 600,
    "md": 900,
    "lg": 1200,
    "xl": 1536,
    "2xl": false
}