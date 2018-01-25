import withProp from '../src/withProp'

test('string argument', () => {
  expect(withProp('type', type => type === 'foo')()).toBe(false)
  expect(withProp('type', type => type === 'foo')({ type: 'bar' })).toBe(false)
  expect(withProp('type', type => type === 'foo')({ type: 'foo' })).toBe(true)
})

test('deep string argument', () => {
  expect(withProp('foo.bar', bar => bar === 'foo')()).toBe(false)
  expect(withProp('foo.bar', bar => bar === 'foo')({ foo: {} })).toBe(false)
  expect(withProp('foo.bar', bar => bar === 'foo')({ foo: { bar: 'bar' } })).toBe(false)
  expect(withProp('foo.bar', bar => bar === 'foo')({ foo: { bar: 'foo' } })).toBe(true)
})

test('deep array argument', () => {
  expect(withProp(['foo', 'bar'], bar => bar === 'foo')()).toBe(false)
  expect(withProp(['foo', 'bar'], bar => bar === 'foo')({ foo: {} })).toBe(false)
  expect(withProp(['foo', 'bar'], bar => bar === 'foo')({ foo: { bar: 'bar' } })).toBe(false)
  expect(withProp(['foo', 'bar'], bar => bar === 'foo')({ foo: { bar: 'foo' } })).toBe(true)
})

test('function argument', () => {
  expect(withProp(props => props.type, type => type === 'foo')()).toBe(false)
  expect(withProp(props => props.type, type => type === 'foo')({ type: 'bar' })).toBe(false)
  expect(withProp(props => props.type, type => type === 'foo')({ type: 'foo' })).toBe(true)
})
