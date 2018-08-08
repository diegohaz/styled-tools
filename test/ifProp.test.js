import ifProp from "../src/ifProp";

test("no pass/fail", () => {
  expect(ifProp("foo")({ foo: true })).toBe("");
});

test("string argument", () => {
  expect(ifProp("foo", "yes", "no")()).toBe("no");
  expect(ifProp("foo", "yes", "no")({ foo: true })).toBe("yes");
  expect(ifProp("foo", "yes", "no")({ foo: false })).toBe("no");
});

test("deep string argument", () => {
  expect(ifProp("foo.bar", "yes", "no")({ foo: { bar: true } })).toBe("yes");
  expect(ifProp("foo.bar", "yes", "no")({ foo: { bar: false } })).toBe("no");
});

test("array argument", () => {
  expect(ifProp(["foo"], "yes", "no")({ bar: false, foo: true })).toBe("yes");
  expect(ifProp(["foo", "bar"], "yes", "no")({ bar: true, foo: true })).toBe(
    "yes"
  );
  expect(ifProp(["foo", "bar"], "yes", "no")({ foo: true, bar: false })).toBe(
    "no"
  );
});

test("deep array argument", () => {
  expect(
    ifProp(["foo.bar", "baz"], "yes", "no")({ baz: true, foo: { bar: true } })
  ).toBe("yes");
  expect(
    ifProp(["foo.bar", "baz"], "yes", "no")({ foo: { bar: true }, baz: false })
  ).toBe("no");
  expect(
    ifProp(["foo.bar", "baz"], "yes", "no")({ foo: { bar: false }, baz: true })
  ).toBe("no");
});

test("function array argument", () => {
  expect(
    ifProp([props => props.foo], "yes", "no")({ bar: false, foo: true })
  ).toBe("yes");
});

test("object array argument", () => {
  expect(ifProp([{ foo: true }], "yes", "no")({ bar: false, foo: true })).toBe(
    "yes"
  );
});

test("object argument", () => {
  expect(ifProp({ foo: "ok" }, "yes", "no")({ foo: "ok" })).toBe("yes");
  expect(ifProp({ foo: "ok" }, "yes", "no")({ foo: "not ok" })).toBe("no");
  expect(
    ifProp({ foo: "ok", bar: "ok" }, "yes", "no")({ bar: "ok", foo: "ok" })
  ).toBe("yes");
  expect(
    ifProp({ foo: "ok", bar: "ok" }, "yes", "no")({ foo: "not ok", bar: "ok" })
  ).toBe("no");
});

test("deep object argument", () => {
  expect(ifProp({ "foo.bar": "ok" }, "yes", "no")({ foo: { bar: "ok" } })).toBe(
    "yes"
  );
  expect(ifProp({ "foo.bar": "ok" }, "yes", "no")({ foo: { bar: "no" } })).toBe(
    "no"
  );
});

test("function argument", () => {
  expect(ifProp(props => props.foo, "yes", "no")()).toBe("no");
  expect(ifProp(props => props.foo, "yes", "no")({ foo: false })).toBe("no");
  expect(ifProp(props => props.foo, "yes", "no")({ foo: true })).toBe("yes");
});

test("function values", () => {
  expect(
    ifProp("foo", props => props.foo, props => props.bar)({ bar: "bar" })
  ).toBe("bar");
  expect(
    ifProp("foo", props => props.foo, props => props.bar)({ foo: "foo" })
  ).toBe("foo");
});
