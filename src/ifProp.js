// @flow
/* eslint-disable no-use-before-define */
import prop from "./prop";
import type { Needle, PropsFn } from ".";

const parseFunction = (props: Object, test: Function): boolean =>
  Boolean(test(props));

const parseObject = (props: Object, test: Object): boolean => {
  const keys = Object.keys(test);
  const { length } = keys;

  for (let index = 0; index < length; index += 1) {
    const key = keys[index];
    const expected = test[key];
    const value = prop(key)(props);
    if (expected !== value) {
      return false;
    }
  }

  return true;
};

const parseString = (props: Object, test: string): boolean =>
  Boolean(prop(test)(props));

/**
 * Returns `pass` if prop is truthy. Otherwise returns `fail`
 * @example
 * // usage with styled-theme
 * import styled from "styled-components";
 * import { ifProp } from "styled-tools";
 * import { palette } from "styled-theme";
 *
 * const Button = styled.button`
 *   background-color: ${ifProp("transparent", "transparent", palette(0))};
 *   color: ${ifProp(["transparent", "accent"], palette("secondary", 0))};
 *   font-size: ${ifProp({ size: "large" }, "20px", ifProp({ size: "medium" }, "16px", "12px"))};
 * `;
 */
const ifProp = (
  test: Needle | Needle[] | Object,
  pass: any = "",
  fail: any = ""
): PropsFn => (props = {}) => {
  if (Array.isArray(test)) {
    const { length } = test;
    let index = 0;
    let value = pass;
    while (value !== fail && index < length) {
      value = ifProp(test[index], pass, fail)(props);
      index += 1;
    }
    return value;
  }

  const parseMap = {
    function: parseFunction,
    object: parseObject,
    string: parseString
  };

  const result = parseMap[typeof test](props, test);
  const value = result ? pass : fail;
  return typeof value === "function" ? value(props) : value;
};

export default ifProp;
