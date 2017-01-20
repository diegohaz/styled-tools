import { get, ifProp } from '../src'

describe('get', () => {
  it('handles string', () => {
    expect(get('color')()).toBeUndefined()
    expect(get('color')({})).toBeUndefined()
    expect(get('color')({ color: 'red' })).toBe('red')
  })

  it('handles deep string', () => {
    expect(get('color.primary')()).toBeUndefined()
    expect(get('color.primary')({})).toBeUndefined()
    expect(get('color.primary')({ color: {} })).toBeUndefined()
    expect(get('color.primary')({ color: { primary: 'red' } })).toBe('red')
  })

  it('handles array', () => {
    expect(get(['color', 'primary'])()).toBeUndefined()
    expect(get(['color', 'primary'])({})).toBeUndefined()
    expect(get(['color', 'primary'])({ color: {} })).toBeUndefined()
    expect(get(['color', 'primary'])({ color: { primary: 'red' } })).toBe('red')
  })

  it('handles defaultValue', () => {
    expect(get('color', 'red')()).toBe('red')
    expect(get('color', 'red')({})).toBe('red')
    expect(get('color', 'red')({ color: 'blue' })).toBe('blue')
  })
})

describe('ifProp', () => {
  it('handles string needle', () => {
    expect(ifProp('foo', 'yes', 'no')()).toBe('no')
    expect(ifProp('foo', 'yes', 'no')({ foo: true })).toBe('yes')
    expect(ifProp('foo', 'yes', 'no')({ foo: false })).toBe('no')
  })

  it('handles deep string needle', () => {
    expect(ifProp('foo.bar', 'yes', 'no')({ foo: { bar: true } })).toBe('yes')
    expect(ifProp('foo.bar', 'yes', 'no')({ foo: { bar: false } })).toBe('no')
  })

  it('handles array needle', () => {
    expect(ifProp(['foo'], 'yes', 'no')({ bar: false, foo: true })).toBe('yes')
    expect(ifProp(['foo', 'bar'], 'yes', 'no')({ bar: true, foo: true })).toBe('yes')
    expect(ifProp(['foo', 'bar'], 'yes', 'no')({ foo: true, bar: false })).toBe('no')
  })

  it('handles deep array needle', () => {
    expect(ifProp(['foo.bar', 'baz'], 'yes', 'no')({ baz: true, foo: { bar: true } })).toBe('yes')
    expect(ifProp(['foo.bar', 'baz'], 'yes', 'no')({ foo: { bar: true }, baz: false })).toBe('no')
    expect(ifProp(['foo.bar', 'baz'], 'yes', 'no')({ foo: { bar: false }, baz: true })).toBe('no')
  })

  it('handles object needle', () => {
    expect(ifProp({ foo: 'ok' }, 'yes', 'no')({ foo: 'ok' })).toBe('yes')
    expect(ifProp({ foo: 'ok' }, 'yes', 'no')({ foo: 'not ok' })).toBe('no')
    expect(ifProp({ foo: 'ok', bar: 'ok' }, 'yes', 'no')({ bar: 'ok', foo: 'ok' })).toBe('yes')
    expect(ifProp({ foo: 'ok', bar: 'ok' }, 'yes', 'no')({ foo: 'not ok', bar: 'ok' })).toBe('no')
  })

  it('handles deep object needle', () => {
    expect(ifProp({ 'foo.bar': 'ok' }, 'yes', 'no')({ foo: { bar: 'ok' } })).toBe('yes')
    expect(ifProp({ 'foo.bar': 'ok' }, 'yes', 'no')({ foo: { bar: 'no' } })).toBe('no')
  })
})
