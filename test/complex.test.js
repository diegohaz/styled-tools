import { getLuminance, tint } from "polished";
import { range } from "lodash";
import { palette as p, theme as t, withProp } from "../src";

export const contrastText = bgNeedle =>
  withProp(bgNeedle, bg =>
    getLuminance(bg) > 0.179 ? p("black") : p("white")
  );

export const contrastPalette = (key, tone) => contrastText(p(key, tone));

export const tintPalette = (amount, key, tone) =>
  withProp(p(key, tone), color => tint(amount, color));

export const tonePalette = (key, tone) =>
  withProp(t("colorInterval"), colorInterval =>
    range(5)
      .map(i => i * colorInterval)
      .map(i => tintPalette(i, key, tone))
  );

export const tonePaletteText = key =>
  range(5).map(i => contrastPalette(key, i));

export const tonePaletteWithText = (name, key, tone) => ({
  [name]: tonePalette(key, tone),
  [`${name}Text`]: tonePaletteText(name)
});

const theme = {
  palette: {
    white: "#fff",
    black: "#000",

    blue: "#007bff",

    ...tonePaletteWithText("primary", "blue")
  },
  colorInterval: 0.08
};

test("complex", () => {
  expect(p("primary")({ theme })).toBe("#007bff");
  expect(p("primaryText")({ theme })).toBe("#000");
  expect(p("primary", 1)({ theme })).toBe("#1485ff");
  expect(p("primaryText", 1)({ theme })).toBe("#000");
  expect(p("primary", 2)({ theme })).toBe("#2890ff");
  expect(p("primaryText", 2)({ theme })).toBe("#000");
  expect(p("primary", 3)({ theme })).toBe("#3d9aff");
  expect(p("primaryText", 3)({ theme })).toBe("#000");
  expect(p("primary", 4)({ theme })).toBe("#51a5ff");
  expect(p("primaryText", 4)({ theme })).toBe("#000");
});
