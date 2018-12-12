import withProp from "../src/withProp";
import prop from "../src/prop";

test("string argument", () => {
  expect(withProp("type", type => type === "foo")()).toBe(false);
  expect(withProp("type", type => type === "foo")({ type: "bar" })).toBe(false);
  expect(withProp("type", type => type === "foo")({ type: "foo" })).toBe(true);
  expect(withProp("type", type => type === "foo")({ type: () => "foo" })).toBe(
    true
  );
});

test("deep string argument", () => {
  expect(withProp("foo.bar", bar => bar === "foo")()).toBe(false);
  expect(withProp("foo.bar", bar => bar === "foo")({ foo: {} })).toBe(false);
  expect(
    withProp("foo.bar", bar => bar === "foo")({ foo: { bar: "bar" } })
  ).toBe(false);
  expect(
    withProp("foo.bar", bar => bar === "foo")({ foo: { bar: "foo" } })
  ).toBe(true);
  expect(
    withProp("foo.bar", bar => bar === "bar")({
      foo: { bar: prop("foo.baz"), baz: "bar" }
    })
  ).toBe(true);
});

test("array argument", () => {
  const fn = (...args) => args;
  expect(withProp(["foo", "bar"], fn)()).toEqual([undefined, undefined]);
  expect(withProp(["foo", "bar"], fn)({ foo: "foo" })).toEqual([
    "foo",
    undefined
  ]);
  expect(withProp(["foo", "bar"], fn)({ bar: "bar" })).toEqual([
    undefined,
    "bar"
  ]);
  expect(withProp(["foo", "bar"], fn)({ foo: "foo", bar: "bar" })).toEqual([
    "foo",
    "bar"
  ]);
  expect(
    withProp([props => props.baz, props => props.biz], fn)({
      foo: "foo",
      bar: "bar",
      baz: props => props.foo,
      biz: props => props.bar
    })
  ).toEqual(["foo", "bar"]);
});

test("function argument", () => {
  expect(withProp(props => props.type, type => type === "foo")()).toBe(false);
  expect(
    withProp(props => props.type, type => type === "foo")({ type: "bar" })
  ).toBe(false);
  expect(
    withProp(props => props.type, type => type === "foo")({ type: "foo" })
  ).toBe(true);
  expect(
    withProp(props => props.type, type => type === "bar")({
      type: props => props.foo,
      foo: "bar"
    })
  ).toBe(true);
  expect(
    withProp(prop("type"), type => type === "bar")({
      type: prop("foo"),
      foo: "bar"
    })
  ).toBe(true);
});
