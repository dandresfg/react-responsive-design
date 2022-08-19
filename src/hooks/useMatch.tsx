import { useContext, useEffect, useState } from "react"
import { breakpoint, indexes, breakpoints, defaultBreakpoints } from "../theme/breakpoints"
import { BreakpointContext } from "../theme/theme"

const getLastestBreakpoint = (media: breakpoint, breakpoints: breakpoints): number => {
    const index = Object.keys(breakpoints).indexOf(media) - 1;
    const last: breakpoint | undefined = indexes[index];
    
    if(last) return breakpoints[last as breakpoint]
    return breakpoints["xs"]
}

function useMatch(media: breakpoint | breakpoint[]) {
    const [matches, setMatches] = useState(false);
    const context = useContext(BreakpointContext)

    const onWindowLayerResize = () => {
        const breakpoints = context || defaultBreakpoints;
        const medias: breakpoint[] = Array.isArray(media) ? media : [media];

        let inside = false;
        for (let media of medias) {
            const maxWidth = breakpoints[media];
            const minWidth = getLastestBreakpoint(media, breakpoints)
            console.log(`(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`)
            if (window.matchMedia(`(min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`).matches) {
                inside = true;
                break;
            }
        }
        setMatches(inside)
    }

    useEffect(() => {
        window.addEventListener('resize', onWindowLayerResize)
        return () => {
            window.removeEventListener('resize', onWindowLayerResize)
        }
    }, [])

    return matches;
}

export default useMatch
