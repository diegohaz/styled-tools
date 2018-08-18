// @flow
import prop from "./prop";

type PropsWithThemeFn = (props: { theme: any }) => any;

/**
 * Same as `prop`, except that it returns `props.theme[path]` instead of
 * `props[path]`.
 * @example
 * const Button = styled.button`
 *  color: ${theme("button.color", "red")};
 * `;
 */
const theme = (path: string, defaultValue?: any): PropsWithThemeFn => props => {
  if (typeof props.theme[path] !== "undefined") {
    return props.theme[path];
  }
  return prop(path, defaultValue)(props.theme);
};

export default theme;
