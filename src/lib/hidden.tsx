// Hooks
import useMatch from "../hooks/useMatch"
import { breakpoint, display } from "../theme/breakpoints"
import { createElement } from "react"

type HiddenMedia = {
    media: breakpoint | breakpoint[]
    component?: string | React.ComponentType | React.FC
    display?: display
    children?: React.ReactNode
}

function Hidden(props: HiddenMedia) {
    const inside = useMatch(props.media)

    if (!props.children || inside){
        return null;
    }

    return createElement(props.component || "div", props as React.Attributes, props.children)
}

export default Hidden
