type Needle<Props> = string | ((props?: Props) => any);

export function prop<T = undefined>(
  path: string,
  defaultValue?: T
): <Props>(props?: Props) => Props[keyof Props] | T;

export function theme<T = undefined>(
  path: string,
  defaultValue?: T
): <Props, Theme>(props: Props & { theme: Theme }) => Theme[keyof Theme] | T;

export function ifProp<Props, Pass = undefined, Fail = undefined>(
  test: Needle<Props> | Needle<Props>[] | { [key: string]: any },
  pass?: Pass,
  fail?: Fail
): <P = Props>(props?: P) => Pass | Fail;

export function ifNotProp<Props, Pass = undefined, Fail = undefined>(
  test: Needle<Props> | Needle<Props>[] | { [key: string]: any },
  pass?: Pass,
  fail?: Fail
): <P = Props>(props?: P) => Pass | Fail;

export function switchProp<Props, T = undefined, DefaultCase = undefined>(
  needle: Needle<Props>,
  cases: { [key: string]: T },
  defaultCase?: DefaultCase
): <P = Props>(props?: P) => T | DefaultCase;

export function withProp<Props, T = undefined>(
  needle: Needle<Props> | Needle<Props>[],
  fn: (...args: any[]) => T
): <P = Props>(props?: P) => T;
