import palette from "../src/palette";

const theme = {
  palette: {
    primary: ["primary0", "primary1", "primary2"],
    secondary: "secondary0"
  }
};

test("only index", () => {
  expect(palette()({ theme: {} })).toBeUndefined();
  expect(palette()({ theme })).toBeUndefined();
  expect(palette(0)({ theme })).toBeUndefined();
  expect(palette()({ theme, palette: "primary" })).toBe("primary0");
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

test("palette and index", () => {
  expect(palette("primary")({ theme: {} })).toBeUndefined();
  expect(palette("primary")({ theme })).toBe("primary0");
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
