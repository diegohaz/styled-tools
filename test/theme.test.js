import theme from "../src/theme";

test("string argument", () => {
  expect(theme("color")({ theme: {} })).toBeUndefined();
  expect(theme("color")({ theme: { color: "red" } })).toBe("red");
});

test("deep string argument", () => {
  expect(theme("color.primary")({ theme: { color: {} } })).toBeUndefined();
  expect(theme("color.primary")({ theme: { color: { primary: "red" } } })).toBe(
    "red"
  );
});

test("defaultValue", () => {
  expect(theme("color", "red")({ theme: { color: "blue" } })).toBe("blue");
  expect(theme("color.primary", "red")({ theme: { color: {} } })).toBe("red");
});
