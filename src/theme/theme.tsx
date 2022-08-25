import { createContext, useMemo } from "react"
import { ReactChildren } from "../common/types"
import useBreakpoint from "../hooks/useMediaBreakpoint"
import { breakpoint, breakpointList, breakpointOptions, defaultBreakpoints } from "./breakpoints"

interface IThemeProps extends ReactChildren{
    mode?: breakpointOptions,
    breakpoints?: breakpointList
}

export const MediaContext = createContext<breakpoint>("" as breakpoint);

function MediaProvider(props: IThemeProps) {

    const getBreakpointList = useMemo<breakpointList>(() => {
        if (props.mode){
            // Support to settup pre-loaded endpoints
        }


        // Provide a valid breakpoint object
        // if(typeof props.breakpoints !== "object"){
        // }

        return props.breakpoints || defaultBreakpoints
    }, [props.mode, props.breakpoints])

    const breakpoint = useBreakpoint(getBreakpointList);

    return (
        <MediaContext.Provider value={breakpoint}>
            {props.children}
        </MediaContext.Provider>
    )
}

export default MediaProvider
