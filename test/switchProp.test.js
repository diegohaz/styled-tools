import switchProp from "../src/switchProp";

test("string argument", () => {
  expect(switchProp("type", { red: "red", blue: "blue" })()).toBeUndefined();
  expect(
    switchProp("type", { red: "red", blue: "blue" })({ type: "red" })
  ).toBe("red");
  expect(
    switchProp("type", { red: "red", blue: "blue" })({ type: "blue" })
  ).toBe("blue");
  expect(
    switchProp("type", { red: "red", blue: "blue" })({ type: () => "red" })
  ).toBe("red");
  expect(
    switchProp("type", { red: () => "red", blue: () => "blue" })({
      type: "red"
    })
  ).toBe("red");
});

test("deep string argument", () => {
  expect(
    switchProp("foo.bar", { red: "red", blue: "blue" })({ foo: { bar: "red" } })
  ).toBe("red");
  expect(
    switchProp("foo.bar", { red: "red", blue: "blue" })({
      foo: { bar: "blue" }
    })
  ).toBe("blue");
});

test("function argument", () => {
  expect(
    switchProp(props => props.type, { red: "red", blue: "blue" })()
  ).toBeUndefined();
  expect(
    switchProp(props => props.type, { red: "red", blue: "blue" })({
      type: "red"
    })
  ).toBe("red");
  expect(
    switchProp(props => props.type, { red: "red", blue: "blue" })({
      type: "blue"
    })
  ).toBe("blue");
  expect(
    switchProp(() => props => props.type, { red: "red", blue: "blue" })({
      type: "red"
    })
  ).toBe("red");
});

test("default case", () => {
  expect(
    switchProp("foo", { red: "red", blue: "blue" }, "green")({ foo: "foo" })
  ).toBe("green");
});

test("cases as a function", () => {
  expect(
    switchProp("foo", () => ({ red: "red", blue: "blue" }))({ foo: "blue" })
  ).toBe("blue");
});
