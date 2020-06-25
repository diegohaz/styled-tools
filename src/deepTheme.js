// @flow
import deepProp from "./deepProp";
import type { PropsWithTheme } from ".";

/**
 * Same as `deepProp`, except that it returns `props.theme[path]` instead of
 * `props[path]`.
 * @see {@link #theme theme}
 */
const deepTheme = (path: string, defaultValue?: any) => (
  props: PropsWithTheme
) => deepProp(`theme.${path}`, defaultValue)(props);

export default deepTheme;
