// @flow
import _get from 'lodash/get'
import at from 'lodash/at'
import difference from 'lodash/difference'

/**
 * Returns the value of `props[path]` or `defaultValue`
 * @example
 * const Button = styled.button`
 *  color: ${get('color', 'red')};
 * `
 */
export const get = (path: string | string[], defaultValue?: any): any =>
  (props: Object = {}) => _get(props, path, defaultValue)

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
      const needleValues = Object.values(needle)
      result = !difference(at(props, needleKeys), needleValues).length
    } else {
      result = _get(props, needle)
    }
    return result ? pass : fail
  }
