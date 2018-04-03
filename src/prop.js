// @flow
import get from 'lodash/get'

/**
 * Returns the value of `props[path]` or `defaultValue`
 * @example
 * const Button = styled.button`
 *  color: ${prop('color', 'red')};
 * `
 */
const prop = (path: string, defaultValue?: any): any => (
  (props: Object = {}) => get(props, path, defaultValue)
)

export default prop
