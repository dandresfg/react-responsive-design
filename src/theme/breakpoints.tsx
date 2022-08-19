export type breakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type breakpoints = { [point in breakpoint]: number };

// All breakpoints in one object
export const indexes: breakpoint[] = ["xs", "sm", "md", "lg", "xl"];
export const defaultBreakpoints: breakpoints = {
    xs: 0,
    sm: 600,
    md: 992,
    lg: 1200,
    xl: 1536
}

// Display element
export type display = "block" | "inline" | "run-in" | "flow" | "flow-root" | "table" | "flex" | "grid" | "ruby" | "subgrid" | "block flow" | "inline table" | "flex run-in" | "list-item" | "list-item block" | "list-item inline" | "list-item flow" | "list-item flow-root" | "list-item block flow" | "list-item block flow-root" | "flow list-item block" | "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-cell" | "table-column-group" | "table-column" | "table-caption" | "ruby-base" | "ruby-text" | "ruby-base-container" | "ruby-text-container" | "contents" | "none" | "inline-block" | "inline-table" | "inline-flex" | "inline-grid" | "heredar" | "initial" | "unset";