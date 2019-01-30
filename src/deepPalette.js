// @flow
import {
  getKey,
  getTone,
  getFinalDefaultValue,
  toArray,
  clamp,
  resolveValue
} from "./utils";
import type { PaletteProps } from "./utils";

/**
 * Returns `props.theme.palette[key || props.palette][tone || props.tone || 0]` or `defaultValue`.
 * Supports deep resolving.
 * @see {@link #palette palette}
 */
const deepPalette = (
  keyOrTone?: string | number,
  toneOrDefaultValue?: any,
  defaultValue?: any
) => (props: PaletteProps) => {
  const key = getKey(keyOrTone, props);
  const tone = getTone(keyOrTone, toneOrDefaultValue, props);
  const finalDefaultValue = getFinalDefaultValue(
    toneOrDefaultValue,
    tone,
    defaultValue
  );

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

export default deepPalette;
