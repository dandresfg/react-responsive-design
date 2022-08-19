import { createContext } from "react"
import { ReactChildren } from "../common/types"
import { breakpoints, defaultBreakpoints } from "./breakpoints"

export const BreakpointContext = createContext(defaultBreakpoints)

type ThemeProps = { breakpoints?: breakpoints } & ReactChildren

function ThemeProvider({ children, breakpoints = defaultBreakpoints }: ThemeProps) {
    return (
        <BreakpointContext.Provider value={breakpoints}>
            {children}
        </BreakpointContext.Provider>
    )
}

export default ThemeProvider
