// @flow
type InterpolatedFn = (props: Object) => any;
type Part = string | InterpolatedFn | Part[];

const mapRules = (props: Object) => (part: Part) => {
  if (typeof part === "function") {
    return mapRules(props)(part(props));
  }
  if (Array.isArray(part)) {
    return part.map(mapRules(props)).join("");
  }
  return part;
};

/**
 * Get the style rules from a given styled component.
 *
 * @example
 * import styled from "styled-components";
 * import { getStyle, prop } from "styled-tools";
 *
 * const Background = styled.div`
 *   display: block;
 *   background-color: ${prop("bg")};
 * `;
 *
 * const BlackBackground = styled.div`
 *   ${getStyle(Background, { bg: "black" })};
 * `;
 */
const getStyle = (styledComponent: Object = {}, props: Object = {}) => {
  if (!styledComponent.componentStyle) {
    throw new Error(
      "[styled-tools] getStyle expects to receive a styled component."
    );
  }
  return styledComponent.componentStyle.rules
    .map(mapRules({ ...styledComponent.defaultProps, ...props }))
    .join("");
};

export default getStyle;
