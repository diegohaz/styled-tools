// @flow
import ifProp from "./ifProp";
import type { Needle, PropsFn } from ".";

/**
 * Returns `pass` if prop is falsy. Otherwise returns `fail`
 * @example
 * import styled from "styled-components";
 * import { ifNotProp } from "styled-tools";
 *
 * const Button = styled.button`
 *   font-size: ${ifNotProp("large", "20px", "30px")};
 * `;
 */
const ifNotProp = (
  test: Needle | Needle[] | Object,
  pass?: any,
  fail?: any
): PropsFn => ifProp(test, fail, pass);

export default ifNotProp;
