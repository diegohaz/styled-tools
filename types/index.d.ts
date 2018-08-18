type Dictionary<T = any> = { [key: string]: T };
type PropsFn<ReturnType = any> = (props?: Dictionary) => ReturnType;
type Needle = string | PropsFn;

type PropsWithThemeFn<ReturnType = any> = (
  props: Dictionary & { theme: Dictionary }
) => ReturnType;

export function ifProp<Pass = string, Fail = string>(
  test: Needle | Needle[] | Dictionary,
  pass?: Pass,
  fail?: Fail
): PropsFn<Pass | Fail>;

export function ifNotProp<Pass = string, Fail = string>(
  test: Needle | Needle[] | Dictionary,
  pass?: Pass,
  fail?: Fail
): PropsFn<Pass | Fail>;

export function prop(path: string, defaultValue?: any): PropsFn;

export function switchProp<T = any, DefaultCase = undefined>(
  needle: Needle,
  cases: Dictionary<T>,
  defaultCase?: DefaultCase
): PropsFn<T | DefaultCase>;

export function theme(path: string, defaultValue?: any): PropsWithThemeFn;

export function withProp<T = any>(
  needle: Needle | Needle[],
  fn: (...props: any[]) => T
): PropsFn<T>
