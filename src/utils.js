// @flow
import type { PropsWithTheme } from ".";

export type PaletteProps = PropsWithTheme & {
  palette?: string,
  tone?: number
};

export function get(props: {}, path: string) {
  if (path && path.indexOf(".") > 0) {
    const paths = path.split(".");
    const { length } = paths;
    let object = props[paths[0]];
    let index = 1;

    while (object != null && index < length) {
      object = object[paths[index]];
      index += 1;
    }

    return object;
  }
  return undefined;
}

export function resolveValue(value: any, props: Object) {
  if (typeof value === "function") {
    return resolveValue(value(props), props);
  }
  return value;
}

export const toArray = (arg: any) => (Array.isArray(arg) ? arg : [arg]);

export const clamp = (number: number, min: number, max: number) => {
  if (number < min) return min;
  if (number > max) return max;
  return number;
};

export const getKey = (keyOrTone?: string | number, props: PaletteProps) =>
  typeof keyOrTone === "string" ? keyOrTone : props.palette;

export const getTone = (
  keyOrTone?: string | number,
  toneOrDefaultValue?: any,
  props: PaletteProps
) =>
  typeof keyOrTone === "number"
    ? keyOrTone
    : typeof toneOrDefaultValue === "number"
    ? toneOrDefaultValue
    : props.tone || 0;

export const getFinalDefaultValue = (
  toneOrDefaultValue?: any,
  tone: number,
  defaultValue?: any
) => (toneOrDefaultValue !== tone ? toneOrDefaultValue : defaultValue);
