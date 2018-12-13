// @flow
import resolveValue from "./resolveValue";
import type { PropsWithTheme } from ".";

type Props = PropsWithTheme & {
  palette?: string,
  tone?: number
};

const toArray = (arg: any) => (Array.isArray(arg) ? arg : [arg]);

const clamp = (number: number, min: number, max: number) => {
  if (number < min) return min;
  if (number > max) return max;
  return number;
};

/**
 * Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 * @example
 * import styled, { ThemeProvider } from "styled-components";
 * import { palette } from "styled-tools";
 *
 * const theme = {
 *   palette: {
 *     primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
 *     secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0']
 *   }
 * };
 *
 * const Button = styled.button`
 *   color: ${palette(1)};                    // props.theme.palette[props.palette][1]
 *   color: ${palette("primary", 1)};         // props.theme.palette.primary[1]
 *   color: ${palette("primary")};            // props.theme.palette.primary[props.tone || 0]
 *   color: ${palette("primary", -1)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", 10)};        // props.theme.palette.primary[3]
 *   color: ${palette("primary", -10)};       // props.theme.palette.primary[0]
 *   color: ${palette("primary", 0, "red")};  // props.theme.palette.primary[0] || red
 * `;
 *
 * <ThemeProvider theme={theme}>
 *   <Button palette="secondary" />
 * </ThemeProvider>
 */
const palette = (
  keyOrTone?: string | number,
  toneOrDefaultValue?: any,
  defaultValue?: any
) => (props: Props) => {
  const key = typeof keyOrTone === "string" ? keyOrTone : props.palette;
  const tone =
    typeof keyOrTone === "number"
      ? keyOrTone
      : typeof toneOrDefaultValue === "number"
      ? toneOrDefaultValue
      : props.tone || 0;
  const finalDefaultValue =
    toneOrDefaultValue !== tone ? toneOrDefaultValue : defaultValue;

  if (!props.theme.palette || !props.theme.palette[key]) {
    return finalDefaultValue;
  }

  const tones = toArray(resolveValue(props.theme.palette[key], props));

  if (tone < 0) {
    return resolveValue(
      tones[clamp(tones.length + tone, 0, tones.length - 1)],
      props
    );
  }

  return resolveValue(tones[clamp(tone, 0, tones.length - 1)], props);
};

export default palette;
