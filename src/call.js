// @flow

const call = (fn: Function, ...args: any[]): any => {
  console.warn([
    '[styled-tools] `call` is deprecated.',
    'Please use `withProp` instead.',
    'See https://github.com/diegohaz/styled-tools#withprop'
  ].join(' '))
  return (props: Object = {}): any => fn(...args.map(arg => (
    typeof arg === 'function' ? arg(props) : arg
  )))
}

export default call
