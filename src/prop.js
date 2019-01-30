// @flow
import { get } from "./utils";
import type { PropsFn } from ".";

/**
 * Returns the value of `props[path]` or `defaultValue`
 * @example
 * import styled from "styled-components";
 * import { prop } from "styled-tools";
 *
 * const Button = styled.button`
 *   color: ${prop("color", "red")};
 * `;
 */
const prop = (path: string, defaultValue?: any): PropsFn => (props = {}) => {
  if (typeof props[path] !== "undefined") {
    return props[path];
  }

  const object = get(props, path);

  if (typeof object !== "undefined") {
    return object;
  }

  return defaultValue;
};

export default prop;
