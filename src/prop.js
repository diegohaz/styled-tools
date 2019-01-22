// @flow
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

  if (path && path.indexOf(".") > 0) {
    const paths = path.split(".");
    const { length } = paths;
    let object = props[paths[0]];
    let index = 1;

    while (object != null && index < length) {
      object = object[paths[index]];
      index += 1;
    }

    if (typeof object !== "undefined") {
      return object;
    }
  }

  return defaultValue;
};

export default prop;
