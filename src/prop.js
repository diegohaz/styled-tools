// @flow
/**
 * Returns the value of `props[path]` or `defaultValue`
 * @example
 * const Button = styled.button`
 *  color: ${prop("color", "red")};
 * `;
 */
const prop = (path: string, defaultValue?: any): any => (
  props: Object = {}
) => {
  if (typeof props[path] !== "undefined") {
    return props[path];
  }

  if (path.indexOf(".") > 0) {
    const paths = path.split(".");
    const { length } = paths;
    let index = 0;
    let object = props;

    while (object != null && index < length) {
      object = object[paths[index]];
      index += 1;
    }

    return object;
  }

  return defaultValue;
};

export default prop;
