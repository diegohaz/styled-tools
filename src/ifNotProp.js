// @flow
import type { Needle } from ".";
import ifProp from "./ifProp";

/**
 * Returns `pass` if prop is falsy. Otherwise returns `fail`
 * @example
 * const Button = styled.button`
 *   font-size: ${ifNotProp("large", "20px", "30px")};
 * `;
 */
const ifNotProp = (
  test: Needle | string[] | Object,
  pass?: any,
  fail?: any
): any => ifProp(test, fail, pass);

export default ifNotProp;
