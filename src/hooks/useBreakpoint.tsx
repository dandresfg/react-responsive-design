import { useContext } from "react"
import { MediaContext } from "../theme/theme"

const useBreakpoint = () => {
    const breakpoint = useContext(MediaContext)
    return breakpoint
}

export default useBreakpoint