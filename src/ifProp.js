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

const parseMap = {
  function: parseFunction,
  object: parseObject,
  string: parseString
};

/**
 * Returns `pass` if prop is truthy. Otherwise returns `fail`
 * @example
 * import styled from "styled-components";
 * import { ifProp, palette } from "styled-tools";
 *
 * const Button = styled.button`
 *   background-color: ${ifProp("transparent", "transparent", palette(0))};
 *   color: ${ifProp(["transparent", "accent"], palette("secondary"))};
 *   font-size: ${ifProp({ size: "large" }, "20px", ifProp({ size: "medium" }, "16px", "12px"))};
 * `;
 */
const ifProp = (
  test: Needle | Needle[] | Object,
  pass: any = "",
  fail: any = ""
): PropsFn => (props = {}) => {
  let result = true;

  if (Array.isArray(test)) {
    const { length } = test;
    let index = 0;
    while (result && index < length) {
      result = parseMap[typeof test[index]](props, test[index]);
      index += 1;
    }
  } else {
    result = parseMap[typeof test](props, test);
  }

  const value = result ? pass : fail;
  return typeof value === "function" ? value(props) : value;
};

export default ifProp;
