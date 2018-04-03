import switchProp from '../src/switchProp'

test('string argument', () => {
  expect(switchProp('type', { red: 'red', blue: 'blue' })()).toBeUndefined()
  expect(switchProp('type', { red: 'red', blue: 'blue' })({ type: 'red' })).toBe('red')
  expect(switchProp('type', { red: 'red', blue: 'blue' })({ type: 'blue' })).toBe('blue')
})

test('deep string argument', () => {
  expect(switchProp('foo.bar', { red: 'red', blue: 'blue' })({ foo: { bar: 'red' } })).toBe('red')
  expect(switchProp('foo.bar', { red: 'red', blue: 'blue' })({ foo: { bar: 'blue' } })).toBe('blue')
})

test('function argument', () => {
  expect(switchProp(props => props.type, { red: 'red', blue: 'blue' })()).toBeUndefined()
  expect(switchProp(props => props.type, { red: 'red', blue: 'blue' })({ type: 'red' })).toBe('red')
  expect(switchProp(props => props.type, { red: 'red', blue: 'blue' })({ type: 'blue' })).toBe('blue')
})

test('defaultValue', () => {
  expect(switchProp('color', { red: 'red', blue: 'blue' }, 'green')()).toBe('green')
  expect(switchProp('color', { red: 'red', blue: 'blue' }, 'green')({ color: 'yellow' })).toBe('green')
})
