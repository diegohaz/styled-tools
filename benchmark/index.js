/* eslint-disable import/no-extraneous-dependencies, no-console */
import { Suite } from "benchmark";
import * as prod from "styled-tools";
import * as dev from "../src";
import { version } from "../package.json";

const run = (suite, testName, fn) =>
  suite
    .add(testName, fn)
    .on("cycle", e => {
      console.log(String(e.target));
    })
    .run({ async: true });

const runProd = (name, fn) => {
  run(new Suite(), `${name}@${version}`, () => fn(prod[name]));
};

const runDev = (name, fn) => {
  run(new Suite(), `${name}@dev`, () => fn(dev[name]));
};

const runBoth = (name, fn) => {
  runProd(name, fn);
  runDev(name, fn);
};

const props = { a: "a", b: "b", c: { d: { e: "e" } } };

const suites = {
  ifNotProp: ifNotProp => {
    ifNotProp("a", true, false)(props);
  },
  ifProp: ifProp => {
    ifProp("a", true, false)(props);
    ifProp(["a", "b"], true, false)(props);
    ifProp("foo", true, false)(props);
    ifProp("c.d.e", true, false)(props);
  },
  prop: prop => {
    prop("a")(props);
    prop("foo")(props);
    prop("c.d.e")(props);
  },
  switchProp: switchProp => {
    const cases = { a: "a", b: "b" };
    switchProp("a", cases)(props);
    switchProp("foo", cases)(props);
    switchProp("c.d.e", cases)(props);
  },
  withProp: withProp => {
    withProp("a", a => a)(props);
    withProp("foo", a => a)(props);
    withProp("c.d.e", a => a)(props);
  }
};

const [, , suiteName] = process.argv;

if (suites[suiteName]) {
  runBoth(suiteName, suites[suiteName]);
} else {
  Object.entries(suites).forEach(arg => runDev(...arg));
}
