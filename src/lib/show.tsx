import { MediaChildren } from "../common/types";
import useBreakpoint from "../hooks/useBreakpoint"

const Show: React.FC<MediaChildren> = (props) => {
    const breakpoint = useBreakpoint();

    // Hidden
    if (Array.isArray(props.media) && props.media.every(media => media !== breakpoint) || props.media !== breakpoint) {
        return null;
    }

    return props.children
}

export default Show 