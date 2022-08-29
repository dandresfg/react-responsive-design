import { breakpointList } from "../../lib";

const isBreakpointList = (
  toDeterminate: string | breakpointList
): toDeterminate is breakpointList => {
  if (
    typeof (toDeterminate as breakpointList).xs != "undefined" &&
    typeof (toDeterminate as breakpointList).sm != "undefined" &&
    typeof (toDeterminate as breakpointList).md != "undefined" &&
    typeof (toDeterminate as breakpointList).lg != "undefined" &&
    typeof (toDeterminate as breakpointList).xl != "undefined"
  ) {
    return true;
  }
  return false;
};

export default isBreakpointList;
