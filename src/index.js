// @flow
import _get from 'lodash/get'
import at from 'lodash/at'
import values from 'lodash/values'
import difference from 'lodash/difference'

/**
 * Returns the value of `props[path]` or `defaultValue`
 * @example
 * const Button = styled.button`
 *  color: ${prop('color', 'red')};
 * `
 */
export const prop = (path: string | string[], defaultValue?: any): any =>
  (props: Object = {}) => _get(props, path, defaultValue)

export const get = /* istanbul ignore next */ (...args: any[]) => {
  console.warn('[styled-tools] `get` is deprecated. Please, use `prop` instead.')
  return prop(...args)
}

/**
 * Returns `pass` if prop is truthy. Otherwise returns `fail`
 * @example
 * // usage with styled-theme
 * import styled from 'styled-components'
 * import { ifProp } from 'styled-tools'
 * import { palette } from 'styled-theme'
 *
 * const Button = styled.button`
 *  background-color: ${ifProp('transparent', 'transparent', palette(0))};
 *  color: ${ifProp(['transparent', 'accent'], palette('secondary', 0))};
 *  font-size: ${ifProp({ size: 'large' }, '20px', ifProp({ size: 'medium' }, '16px', '12px'))};
 *`
 */
export const ifProp = (needle: string | string[] | Object, pass?: any, fail?: any): any =>
  (props: Object = {}): any => {
    let result
    if (Array.isArray(needle)) {
      result = !at(props, needle).filter(value => !value).length
    } else if (typeof needle === 'object') {
      const needleKeys = Object.keys(needle)
      const needleValues = values(needle)
      result = !difference(at(props, needleKeys), needleValues).length
    } else {
      result = _get(props, needle)
    }
    return result ? pass : fail
  }

/**
 * Switches on a given prop. Returns the value or function for a given prop value.
 * Otherwise returns `defaultValue`
 * @example
 * import styled, { css } from 'styled-components'
 * import { switchProp } from 'styled-tools'
 *
 * const Button = styled.button`
 *  font-size: ${switchProp('size', {
 *    small: prop('theme.sizes.sm', '12px'),
 *    large: prop('theme.sizes.lg', '20px')
 *  },
 *    prop('theme.sizes.md', '16px')
 *  )};
 *  ${switchProp('theme.kind', {
 *    light: css`
 *      color: LightBlue;
 *    `,
 *    dark: css`
 *      color: DarkBlue;
 *    `,
 *  })}
 * `
 *
 * <Button size="large" theme={{ kind: 'light' }} />
 */
export const switchProp = (needle: string, switches: Object, defaultValue?: any): any =>
  (props: Object = {}): any => {
    const propType = _get(props, needle)
    return _get(switches, propType, defaultValue)
  }

/**
 * Calls a function passing properties values as arguments.
 * @example
 * // example with polished
 * import styled from 'styled-components'
 * import { darken } from 'polished'
 * import { call, prop } from 'styled-tools'
 *
 * const Button = styled.button`
 *  border-color: ${call(darken(0.5), prop('theme.primaryColor', 'blue'))};
 * `
 */
export const call = (fn: Function, ...args: any[]): any =>
  (props: Object = {}): any => fn(...args.map(arg => (
    typeof arg === 'function' ? arg(props) : arg
  )))
