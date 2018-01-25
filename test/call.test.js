import call from '../src/call'
import prop from '../src/prop'

it('passes prop to function', () => {
  const fn = arg => arg
  expect(call(fn, prop('foo'))()).toBeUndefined()
  expect(call(fn, prop('foo'))({ foo: 'bar' })).toBe('bar')
})

it('passes deep prop to function', () => {
  const fn = arg => arg
  expect(call(fn, prop('foo.bar'))()).toBeUndefined()
  expect(call(fn, prop('foo.bar'))({ foo: { bar: 'baz' } })).toBe('baz')
})

it('passes any value to function', () => {
  const fn = (...args) => args
  expect(call(fn, prop('foo'), 1)({ foo: 'bar' })).toEqual(['bar', 1])
})
