import { breakpoint } from "../theme/breakpoints"

export type ReactChildren = {
    children: React.ReactNode | JSX.Element
}

export type MediaChildren = {
    media: breakpoint | breakpoint[]
    children: any
}