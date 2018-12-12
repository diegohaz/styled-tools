// @flow
import prop from "./prop";
import resolveValue from "./resolveValue";
import type { Needle, PropsFn } from ".";

/**
 * Switches on a given prop. Returns the value or function for a given prop value.
 * @example
 * import styled, { css } from "styled-components";
 * import { switchProp, prop } from "styled-tools";
 *
 * const Button = styled.button`
 *   font-size: ${switchProp(prop("size", "medium"), {
 *     small: prop("theme.sizes.sm", "12px"),
 *     medium: prop("theme.sizes.md", "16px"),
 *     large: prop("theme.sizes.lg", "20px")
 *   }};
 *   ${switchProp("theme.kind", {
 *     light: css`
 *       color: LightBlue;
 *     `,
 *     dark: css`
 *       color: DarkBlue;
 *     `
 *   })}
 * `;
 *
 * <Button size="large" theme={{ kind: "light" }} />
 */
const switchProp = (
  needle: Needle,
  cases: Object | PropsFn,
  defaultCase: any
): PropsFn => (props = {}) => {
  const value =
    typeof needle === "function"
      ? resolveValue(needle, props)
      : prop(needle)(props);
  const finalCases = typeof cases === "function" ? cases(props) : cases;
  if (value in finalCases) {
    return resolveValue(finalCases[value], props);
  }
  return defaultCase;
};

export default switchProp;
