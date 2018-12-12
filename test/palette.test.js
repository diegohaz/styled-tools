import palette from "../src/palette";

const theme = {
  palette: {
    primary: ["primary0", "primary1", "primary2"],
    secondary: "secondary0"
  }
};

const deepTheme = {
  palette: {
    primary: [() => "primary0", () => "primary1", () => "primary2"],
    secondary: () => "secondary0"
  }
};

test("only tone", () => {
  expect(palette()({ theme: {} })).toBeUndefined();
  expect(palette()({ theme })).toBeUndefined();
  expect(palette(0)({ theme })).toBeUndefined();
  expect(palette()({ theme, palette: "primary" })).toBe("primary0");
  expect(palette()({ theme, palette: "primary", tone: 2 })).toBe("primary2");
  expect(palette(0)({ theme, palette: "primary" })).toBe("primary0");
  expect(palette(1)({ theme, palette: "primary" })).toBe("primary1");
  expect(palette(-1)({ theme, palette: "primary" })).toBe("primary2");
  expect(palette(-5)({ theme, palette: "primary" })).toBe("primary0");
  expect(palette(5)({ theme, palette: "primary" })).toBe("primary2");
  expect(palette(0)({ theme, palette: "secondary" })).toBe("secondary0");
  expect(palette(1)({ theme, palette: "secondary" })).toBe("secondary0");
  expect(palette(0)({ theme, palette: "other" })).toBeUndefined();
  expect(palette(1, "foo")({ theme: {} })).toBe("foo");
  expect(palette(1, "foo")({ theme })).toBe("foo");
  expect(palette(1, "foo")({ theme, palette: "other" })).toBe("foo");
});

test("palette and tone", () => {
  expect(palette("primary")({ theme: {} })).toBeUndefined();
  expect(palette("primary")({ theme })).toBe("primary0");
  expect(palette("primary")({ theme, tone: 2 })).toBe("primary2");
  expect(palette("primary", 0)({ theme })).toBe("primary0");
  expect(palette("primary", 5)({ theme })).toBe("primary2");
  expect(palette("primary", -1)({ theme })).toBe("primary2");
  expect(palette("primary", -5)({ theme })).toBe("primary0");
  expect(palette("secondary", 0)({ theme })).toBe("secondary0");
  expect(palette("secondary", 1)({ theme })).toBe("secondary0");
  expect(palette("secondary", 1, "foo")({ theme })).toBe("secondary0");
  expect(palette("other", 1)({ theme })).toBeUndefined();
  expect(palette("other", "foo")({ theme: {} })).toBe("foo");
  expect(palette("other", "foo")({ theme })).toBe("foo");
  expect(palette("other", 1, "foo")({ theme })).toBe("foo");
  expect(palette("other", 1)({ theme, palette: "primary" })).toBeUndefined();
  expect(palette("other", 1, "foo")({ theme, palette: "primary" })).toBe("foo");
});

test("deep only tone", () => {
  expect(palette()({ theme: deepTheme })).toBeUndefined();
  expect(palette(0)({ theme: deepTheme })).toBeUndefined();
  expect(palette()({ theme: deepTheme, palette: "primary" })).toBe("primary0");
  expect(palette()({ theme: deepTheme, palette: "primary", tone: 2 })).toBe(
    "primary2"
  );
  expect(palette(0)({ theme: deepTheme, palette: "primary" })).toBe("primary0");
  expect(palette(1)({ theme: deepTheme, palette: "primary" })).toBe("primary1");
  expect(palette(-1)({ theme: deepTheme, palette: "primary" })).toBe(
    "primary2"
  );
  expect(palette(-5)({ theme: deepTheme, palette: "primary" })).toBe(
    "primary0"
  );
  expect(palette(5)({ theme: deepTheme, palette: "primary" })).toBe("primary2");
  expect(palette(0)({ theme: deepTheme, palette: "secondary" })).toBe(
    "secondary0"
  );
  expect(palette(1)({ theme: deepTheme, palette: "secondary" })).toBe(
    "secondary0"
  );
  expect(palette(0)({ theme: deepTheme, palette: "other" })).toBeUndefined();
  expect(palette(1, "foo")({ theme: deepTheme })).toBe("foo");
  expect(palette(1, "foo")({ theme: deepTheme, palette: "other" })).toBe("foo");
});

test("deep palette and tone", () => {
  expect(palette("primary")({ theme: deepTheme })).toBe("primary0");
  expect(palette("primary")({ theme: deepTheme, tone: 2 })).toBe("primary2");
  expect(palette("primary", 0)({ theme: deepTheme })).toBe("primary0");
  expect(palette("primary", 5)({ theme: deepTheme })).toBe("primary2");
  expect(palette("primary", -1)({ theme: deepTheme })).toBe("primary2");
  expect(palette("primary", -5)({ theme: deepTheme })).toBe("primary0");
  expect(palette("secondary", 0)({ theme: deepTheme })).toBe("secondary0");
  expect(palette("secondary", 1)({ theme: deepTheme })).toBe("secondary0");
  expect(palette("secondary", 1, "foo")({ theme: deepTheme })).toBe(
    "secondary0"
  );
  expect(palette("other", 1)({ theme: deepTheme })).toBeUndefined();
  expect(palette("other", "foo")({ theme: deepTheme })).toBe("foo");
  expect(palette("other", 1, "foo")({ theme: deepTheme })).toBe("foo");
  expect(
    palette("other", 1)({ theme: deepTheme, palette: "primary" })
  ).toBeUndefined();
  expect(
    palette("other", 1, "foo")({ theme: deepTheme, palette: "primary" })
  ).toBe("foo");
});
