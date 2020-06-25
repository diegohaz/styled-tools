import deepPalette from "../src/deepPalette";

const theme = {
  palette: {
    primary: [() => "primary0", () => "primary1", () => "primary2"],
    secondary: () => "secondary0"
  }
};

test("deep only tone", () => {
  expect(deepPalette()({ theme })).toBeUndefined();
  expect(deepPalette(0)({ theme })).toBeUndefined();
  expect(deepPalette()({ theme, palette: "primary" })).toBe("primary0");
  expect(deepPalette()({ theme, palette: "primary", tone: 2 })).toBe(
    "primary2"
  );
  expect(deepPalette(0)({ theme, palette: "primary" })).toBe("primary0");
  expect(deepPalette(1)({ theme, palette: "primary" })).toBe("primary1");
  expect(deepPalette(-1)({ theme, palette: "primary" })).toBe("primary2");
  expect(deepPalette(-5)({ theme, palette: "primary" })).toBe("primary0");
  expect(deepPalette(5)({ theme, palette: "primary" })).toBe("primary2");
  expect(deepPalette(0)({ theme, palette: "secondary" })).toBe("secondary0");
  expect(deepPalette(1)({ theme, palette: "secondary" })).toBe("secondary0");
  expect(deepPalette(0)({ theme, palette: "other" })).toBeUndefined();
  expect(deepPalette(1, "foo")({ theme })).toBe("foo");
  expect(deepPalette(1, "foo")({ theme, palette: "other" })).toBe("foo");
});

test("deep palette and tone", () => {
  expect(deepPalette("primary")({ theme })).toBe("primary0");
  expect(deepPalette("primary")({ theme, tone: 2 })).toBe("primary2");
  expect(deepPalette("primary", 0)({ theme })).toBe("primary0");
  expect(deepPalette("primary", 5)({ theme })).toBe("primary2");
  expect(deepPalette("primary", -1)({ theme })).toBe("primary2");
  expect(deepPalette("primary", -5)({ theme })).toBe("primary0");
  expect(deepPalette("secondary", 0)({ theme })).toBe("secondary0");
  expect(deepPalette("secondary", 1)({ theme })).toBe("secondary0");
  expect(deepPalette("secondary", 1, "foo")({ theme })).toBe("secondary0");
  expect(deepPalette("other", 1)({ theme })).toBeUndefined();
  expect(deepPalette("other", "foo")({ theme })).toBe("foo");
  expect(deepPalette("other", 1, "foo")({ theme })).toBe("foo");
  expect(
    deepPalette("other", 1)({ theme, palette: "primary" })
  ).toBeUndefined();
  expect(deepPalette("other", 1, "foo")({ theme, palette: "primary" })).toBe(
    "foo"
  );
});
