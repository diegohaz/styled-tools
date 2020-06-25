import deepTheme from "../src/deepTheme";

test("string argument", () => {
  expect(deepTheme("color")({ theme: { color: () => "red" } })).toBe("red");
  expect(
    deepTheme("color")({
      theme: { color: props => props.theme.bg, bg: "blue" }
    })
  ).toBe("blue");
  expect(
    deepTheme("color")({ theme: { color: deepTheme("bg"), bg: "blue" } })
  ).toBe("blue");
  expect(
    deepTheme("linkColor")({
      theme: {
        blue: "#007bff",
        primary: deepTheme("blue"),
        linkColor: deepTheme("primary")
      }
    })
  ).toBe("#007bff");
});

test("deep string argument", () => {
  expect(
    deepTheme("color.primary")({
      theme: {
        color: { primary: deepTheme("color.secondary"), secondary: "blue" }
      }
    })
  ).toBe("blue");
});
