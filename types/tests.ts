import { prop, theme, palette, ifProp, ifNotProp, switchProp, withProp } from "..";

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

palette("a")({ theme: { palette: { a: "a" } } }) as string;
palette("a")({ theme: { palette: { a: "a" } } }) as undefined;
palette()({ theme: { palette: { a: "a", b: "b" } }, palette: "a" });
palette(1)({ theme: { palette: { a: "a" } }, palette: "a" }) as string;
palette(1)({ theme: { palette: { a: "a" } }, palette: "a" }) as undefined;
palette("a", 1)({ theme: { palette: { a: "a" } } }) as string;
palette("a", 1)({ theme: { palette: { a: "a" } } }) as undefined;
palette("a", 1, "b")({ theme: { palette: { a: "a" } } }) as string;
palette("a", 1, "b")({ theme: { palette: { a: "a" } } }) as undefined;
palette("a", "b")({ theme: { palette: { a: "a" } } }) as string;
palette("a", "b")({ theme: { palette: { a: "a" } } }) as undefined;
palette(1, "b")({ theme: {} }) as string;
palette(1, "b")({ theme: {} }) as undefined;

ifProp("a", true)({ a: true }) as boolean;
ifProp("a", true)({ a: true }) as undefined;
ifProp("a", 1)({ a: true }) as number;
ifProp("a", 1)({ a: true }) as undefined;
ifProp("a", 1, 2)({ a: true }) as number;
ifProp("a", "a")({ a: true }) as string;
ifProp("a", "a")({ a: true }) as undefined;
ifProp("a")({ a: true }) as undefined;
ifProp("a", ifProp("b", "5", "0"), ifProp("c", "5", "0"))({ a: false, b: true, c: false }) as string;

ifNotProp("a", true)({ a: true }) as boolean;
ifNotProp("a", true)({ a: true }) as undefined;
ifNotProp("a", 1)({ a: true }) as number;
ifNotProp("a", 1)({ a: true }) as undefined;
ifNotProp("a", 1, 2)({ a: true }) as number;
ifNotProp("a", "a")({ a: true }) as string;
ifNotProp("a", "a")({ a: true }) as undefined;
ifNotProp("a")({ a: true }) as undefined;
ifNotProp("a", ifNotProp("b", "5", "0"), ifNotProp("c", "5", "0"))({ a: false, b: true, c: false }) as string;

switchProp("a", { a: true, b: 1 })({ a: "a" }) as boolean;
switchProp("a", { a: true, b: 1 })({ a: "a" }) as number;
switchProp("a", { a: true, b: 1 })({ a: "a" }) as undefined;
switchProp("a", { a: true, b: 1 }, "a")({ a: "a" }) as boolean;
switchProp("a", { a: true, b: 1 }, "a")({ a: "a" }) as number;
switchProp("a", { a: true, b: 1 }, "a")({ a: "a" }) as string;
switchProp("a", () => ({ a: "a" }))({ a: "a" }) as string;

withProp("a", a => a)({ a: false }) as any;
withProp("a", () => 1)({ a: false }) as number;
withProp("a", () => "a")({ a: false }) as string;
withProp("a", () => true)({ a: false }) as boolean;
withProp("a", () => {})({ a: false }) as void;
