import theme from "../src/theme";

test("string argument", () => {
  expect(theme("color")({ theme: {} })).toBeUndefined();
  expect(theme("color")({ theme: { color: "red" } })).toBe("red");
  expect(theme("color")({ theme: { color: () => "red" } })).toBe("red");
  expect(
    theme("color")({ theme: { color: props => props.theme.bg, bg: "blue" } })
  ).toBe("blue");
  expect(theme("color")({ theme: { color: theme("bg"), bg: "blue" } })).toBe(
    "blue"
  );
  expect(
    theme("linkColor")({
      theme: {
        blue: "#007bff",
        primary: theme("blue"),
        linkColor: theme("primary")
      }
    })
  ).toBe("#007bff");
});

test("deep string argument", () => {
  expect(theme("color.primary")({ theme: { color: {} } })).toBeUndefined();
  expect(theme("color.primary")({ theme: { color: { primary: "red" } } })).toBe(
    "red"
  );
  expect(
    theme("color.primary")({
      theme: { color: { primary: theme("color.secondary"), secondary: "blue" } }
    })
  ).toBe("blue");
});

test("defaultValue", () => {
  expect(theme("color", "red")({ theme: { color: "blue" } })).toBe("blue");
  expect(theme("color.primary", "red")({ theme: { color: {} } })).toBe("red");
});
