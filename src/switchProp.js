// @flow
import get from "lodash/get";
import type { Needle } from ".";

/**
 * Switches on a given prop. Returns the value or function for a given prop value.
 * @example
 * import styled, { css } from "styled-components";
 * import { switchProp, prop } from "styled-tools";
 *
 * const Button = styled.button`
 *  font-size: ${switchProp(prop("size", "medium"), {
 *    small: prop("theme.sizes.sm", "12px"),
 *    medium: prop("theme.sizes.md", "16px"),
 *    large: prop("theme.sizes.lg", "20px")
 *  }};
 *  ${switchProp("theme.kind", {
 *    light: css`
 *      color: LightBlue;
 *    `,
 *    dark: css`
 *      color: DarkBlue;
 *    `
 *  })}
 * `;
 *
 * <Button size="large" theme={{ kind: "light" }} />
 */
const switchProp = (needle: Needle, cases: Object, defaultCase: any): any => (
  props: Object = {}
): any => {
  const value =
    typeof needle === "function" ? needle(props) : get(props, needle);
  return get(cases, value, defaultCase);
};

export default switchProp;
