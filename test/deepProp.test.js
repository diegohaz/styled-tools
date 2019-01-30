import deepProp from "../src/deepProp";

test("string argument", () => {
  expect(deepProp("color")({ color: () => "red" })).toBe("red");
  expect(deepProp("color")({ color: props => props.bg, bg: "red" })).toBe(
    "red"
  );
});

test("deep string argument", () => {
  expect(deepProp("color.primary")({ color: { primary: () => "red" } })).toBe(
    "red"
  );
  expect(
    deepProp("color.primary")({
      color: { primary: deepProp("color.secondary"), secondary: "blue" }
    })
  ).toBe("blue");
});
