import { MediaChildren } from "../common/types";
import useBreakpoint from "../hooks/useBreakpoint";

const Show: React.FC<MediaChildren> = (props) => {
  const breakpoint = useBreakpoint();

  // Show
  if (
    (Array.isArray(props.media) &&
      props.media.some((media) => media == breakpoint)) ||
    props.media == breakpoint
  ) {
    return props.children;
  }

  return null;
};

export default Show;
