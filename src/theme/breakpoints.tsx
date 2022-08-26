export type breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type breakpointList = {
    "xs": number,
    "sm": number,
    "md": number,
    "lg": number,
    "xl": number,
    "2xl"?: number
};

export type breakpointOptions = "bootstrap" | "tailwind" | "material"

export const defaultBreakpoints: breakpointList = {
    "xs": 0,
    "sm": 600,
    "md": 900,
    "lg": 1200,
    "xl": 1536
}