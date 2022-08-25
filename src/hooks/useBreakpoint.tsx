import { useContext } from "react";
import { MediaContext } from "../theme/theme";

const useBreakpoint = () => {
  const breakpoint = useContext(MediaContext);

  if (!breakpoint.trim().length)
    console.warn(
      `Components must have a MediaProvider as context at the top level.
      Your components will not work as expected`
    );

  return breakpoint;
};

export default useBreakpoint;
