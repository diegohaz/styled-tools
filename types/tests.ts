import { prop, theme, ifProp, ifNotProp, switchProp, withProp } from "..";

prop("a")({ a: true }) as boolean;
prop("a")({ a: true }) as undefined;
prop("a")({ b: 1 }) as number;
prop("a")({ b: 1 }) as undefined;
prop("a", true)({ b: 1 }) as number;
prop("a", true)({ b: 1 }) as boolean;
prop("a", "b")({ b: 1 }) as number;
prop("a", "b")({ b: 1 }) as string;

theme("a")({ theme: { a: 1 } }) as number;
theme("a")({ theme: { a: 1 } }) as undefined;
theme("a")({ theme: { a: true } }) as boolean;
theme("a")({ theme: { a: true } }) as undefined;
theme("a", "b")({ theme: { a: true } }) as boolean;
theme("a", "b")({ theme: { a: true } }) as string;
theme("a", "b")({ a: 1, theme: { a: true } }) as boolean;
theme("a", "b")({ a: 1, theme: { a: true } }) as string;

ifProp("a", true)({ a: true }) as boolean;
ifProp("a", true)({ a: true }) as undefined;
ifProp("a", 1)({ a: true }) as number;
ifProp("a", 1)({ a: true }) as undefined;
ifProp("a", 1, 2)({ a: true }) as number;
ifProp("a", "a")({ a: true }) as string;
ifProp("a", "a")({ a: true }) as undefined;
ifProp("a")({ a: true }) as undefined;

ifNotProp("a", true)({ a: true }) as boolean;
ifNotProp("a", true)({ a: true }) as undefined;
ifNotProp("a", 1)({ a: true }) as number;
ifNotProp("a", 1)({ a: true }) as undefined;
ifNotProp("a", 1, 2)({ a: true }) as number;
ifNotProp("a", "a")({ a: true }) as string;
ifNotProp("a", "a")({ a: true }) as undefined;
ifNotProp("a")({ a: true }) as undefined;

switchProp("a", { a: true, b: 1 })({ a: "a" }) as boolean;
switchProp("a", { a: true, b: 1 })({ a: "a" }) as number;
switchProp("a", { a: true, b: 1 })({ a: "a" }) as undefined;
switchProp("a", { a: true, b: 1 }, "a")({ a: "a" }) as boolean;
switchProp("a", { a: true, b: 1 }, "a")({ a: "a" }) as number;
switchProp("a", { a: true, b: 1 }, "a")({ a: "a" }) as string;

withProp("a", a => a)({ a: false }) as any;
withProp("a", () => 1)({ a: false }) as number;
withProp("a", () => "a")({ a: false }) as string;
withProp("a", () => true)({ a: false }) as boolean;
withProp("a", () => {})({ a: false }) as void;
