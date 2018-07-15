// @flow
import get from "lodash/get";
import at from "lodash/at";
import values from "lodash/values";
import difference from "lodash/difference";
import type { Needle } from ".";

/**
 * Returns `pass` if prop is truthy. Otherwise returns `fail`
 * @example
 * // usage with styled-theme
 * import styled from "styled-components";
 * import { ifProp } from "styled-tools";
 * import { palette } from "styled-theme";
 *
 * const Button = styled.button`
 *   background-color: ${ifProp("transparent", "transparent", palette(0))};
 *   color: ${ifProp(["transparent", "accent"], palette("secondary", 0))};
 *   font-size: ${ifProp({ size: "large" }, "20px", ifProp({ size: "medium" }, "16px", "12px"))};
 * `;
 */
const ifProp = (
  test: Needle | string[] | Object,
  pass?: any,
  fail?: any
): any => (props: Object = {}): any => {
  let result;
  if (Array.isArray(test)) {
    result = !at(props, test).filter(value => !value).length;
  } else if (typeof test === "function") {
    result = test(props);
  } else if (typeof test === "object") {
    const testKeys = Object.keys(test);
    const testValues = values(test);
    result = !difference(at(props, testKeys), testValues).length;
  } else {
    result = get(props, test);
  }
  const value = result ? pass : fail;
  return typeof value === "function" ? value(props) : value;
};

export default ifProp;
