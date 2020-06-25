// @flow
import { get, resolveValue } from "./utils";
import type { PropsFn } from ".";

/**
 * Returns the value of `props[path]` or `defaultValue`. Supports deep
 * resolving.
 * @see {@link #prop prop}
 */
const deepProp = (path: string, defaultValue?: any): PropsFn => (
  props = {}
) => {
  if (typeof props[path] !== "undefined") {
    return resolveValue(props[path], props);
  }

  const object = get(props, path);

  if (typeof object !== "undefined") {
    return resolveValue(object, props);
  }

  return defaultValue;
};

export default deepProp;
