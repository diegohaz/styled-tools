import { ifProp, ifNotProp, prop, switchProp, withProp } from "..";

ifProp("a", true)({ a: true });
ifProp("a", true, false)({ a: true });
ifProp("a", true, false)({ a: true });

ifNotProp("a", true)({ a: true });
ifNotProp("a", true, false)({ a: true });
ifNotProp("a", true, false)({ a: true });

prop("a")({ a: true });
prop("a")({ b: true });
prop("a", "b")({ b: true });

switchProp("a", { a: true, b: "c" })({ a: true });
switchProp("a", { a: true, b: "c" }, 1)({ a: true });
switchProp("a", { a: true, b: "c" }, 1)({ a: "a" });

withProp("a", (a: boolean) => a)({ a: false });
withProp(["a", "b"], (a: number, b: string) => b)({ a: false });