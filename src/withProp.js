// @flow
import get from "lodash/get";
import type { Needle } from ".";

/**
 * Calls a function passing properties values as arguments.
 * @example
 * // example with polished
 * import styled from "styled-components";
 * import { darken } from "polished";
 * import { withProp, prop } from "styled-tools";
 *
 * const Button = styled.button`
 *   border-color: ${withProp(prop("theme.primaryColor", "blue"), darken(0.5))};
 *   font-size: ${withProp("theme.size", size => `${size + 1}px`)};
 *   background: ${withProp(["foo", "bar"], (foo, bar) => `${foo}${bar}`)};
 * `;
 */
const withProp = (needle: Needle | Needle[], fn: Function): any => (
  props: Object = {}
): any => {
  if (Array.isArray(needle)) {
    const needles = needle.map(arg => withProp(arg, x => x)(props));
    return fn(...needles);
  }
  if (typeof needle === "function") {
    return fn(needle(props));
  }
  return fn(get(props, needle));
};

export default withProp;
