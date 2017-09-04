import { prop, get, ifProp, switchProp } from '../src'

describe('prop', () => {
  it('handles string', () => {
    expect(prop('color')()).toBeUndefined()
    expect(prop('color')({})).toBeUndefined()
    expect(prop('color')({ color: 'red' })).toBe('red')
  })

  it('handles deep string', () => {
    expect(prop('color.primary')()).toBeUndefined()
    expect(prop('color.primary')({})).toBeUndefined()
    expect(prop('color.primary')({ color: {} })).toBeUndefined()
    expect(prop('color.primary')({ color: { primary: 'red' } })).toBe('red')
  })

  it('handles array', () => {
    expect(prop(['color', 'primary'])()).toBeUndefined()
    expect(prop(['color', 'primary'])({})).toBeUndefined()
    expect(prop(['color', 'primary'])({ color: {} })).toBeUndefined()
    expect(prop(['color', 'primary'])({ color: { primary: 'red' } })).toBe('red')
  })

  it('handles defaultValue', () => {
    expect(prop('color', 'red')()).toBe('red')
    expect(prop('color', 'red')({})).toBe('red')
    expect(prop('color', 'red')({ color: 'blue' })).toBe('blue')
  })
})

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

describe('switchProp', () => {
  it('handles switching', () => {
    expect(switchProp('type', { red: 'red', blue: 'blue' })()).toBeUndefined()
    expect(switchProp('type', { red: 'red', blue: 'blue' })({ type: 'red' })).toBe('red')
    expect(switchProp('type', { red: 'red', blue: 'blue' })({ type: 'blue' })).toBe('blue')
  })

  it('handles deep switching', () => {
    expect(switchProp('foo.bar', { red: 'red', blue: 'blue' })({ foo: { bar: 'red' } })).toBe('red')
    expect(switchProp('foo.bar', { red: 'red', blue: 'blue' })({ foo: { bar: 'blue' } })).toBe('blue')
  })
})
