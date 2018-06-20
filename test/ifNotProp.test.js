import ifNotProp from "../src/ifNotProp";

test("string argument", () => {
  expect(ifNotProp("foo", "no", "yes")()).toBe("no");
  expect(ifNotProp("foo", "no", "yes")({ foo: true })).toBe("yes");
  expect(ifNotProp("foo", "no", "yes")({ foo: false })).toBe("no");
});

test("deep string argument", () => {
  expect(ifNotProp("foo.bar", "no", "yes")({ foo: { bar: true } })).toBe("yes");
  expect(ifNotProp("foo.bar", "no", "yes")({ foo: { bar: false } })).toBe("no");
});

test("array argument", () => {
  expect(ifNotProp(["foo"], "no", "yes")({ bar: false, foo: true })).toBe(
    "yes"
  );
  expect(ifNotProp(["foo", "bar"], "no", "yes")({ bar: true, foo: true })).toBe(
    "yes"
  );
  expect(
    ifNotProp(["foo", "bar"], "no", "yes")({ foo: true, bar: false })
  ).toBe("no");
});

test("deep array argument", () => {
  expect(
    ifNotProp(["foo.bar", "baz"], "no", "yes")({
      baz: true,
      foo: { bar: true }
    })
  ).toBe("yes");
  expect(
    ifNotProp(["foo.bar", "baz"], "no", "yes")({
      foo: { bar: true },
      baz: false
    })
  ).toBe("no");
  expect(
    ifNotProp(["foo.bar", "baz"], "no", "yes")({
      foo: { bar: false },
      baz: true
    })
  ).toBe("no");
});

test("object argument", () => {
  expect(ifNotProp({ foo: "ok" }, "no", "yes")({ foo: "ok" })).toBe("yes");
  expect(ifNotProp({ foo: "ok" }, "no", "yes")({ foo: "not ok" })).toBe("no");
  expect(
    ifNotProp({ foo: "ok", bar: "ok" }, "no", "yes")({ bar: "ok", foo: "ok" })
  ).toBe("yes");
  expect(
    ifNotProp({ foo: "ok", bar: "ok" }, "no", "yes")({
      foo: "not ok",
      bar: "ok"
    })
  ).toBe("no");
});

test("deep object argument", () => {
  expect(
    ifNotProp({ "foo.bar": "ok" }, "no", "yes")({ foo: { bar: "ok" } })
  ).toBe("yes");
  expect(
    ifNotProp({ "foo.bar": "ok" }, "no", "yes")({ foo: { bar: "no" } })
  ).toBe("no");
});

test("function argument", () => {
  expect(ifNotProp(props => props.foo, "no", "yes")()).toBe("no");
  expect(ifNotProp(props => props.foo, "no", "yes")({ foo: false })).toBe("no");
  expect(ifNotProp(props => props.foo, "no", "yes")({ foo: true })).toBe("yes");
});
