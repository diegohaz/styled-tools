type Needle<Props> = string | ((props?: Props) => any);

export function prop<T = undefined>(
  path: string,
  defaultValue?: T
): <Props>(props?: Props) => Props[keyof Props] | T;

export function theme<T = undefined>(
  path: string,
  defaultValue?: T
): <Props, Theme extends { [key: string]: any }>(
  props: Props & { theme: Theme }
) => Theme[keyof Theme] | T;

type ThemeWithPalette = {
  palette?: { [key: string]: any };
};

interface Palette {
  (tone?: number): <Props, Theme extends ThemeWithPalette>(
    props: Props & {
      theme: Theme;
      palette?: keyof Theme["palette"];
      tone?: number;
    }
  ) => any;

  (tone: number, defaultValue: any): <Props, Theme extends ThemeWithPalette>(
    props: Props & { theme: Partial<Theme>; palette?: keyof Theme["palette"] }
  ) => any;

  (key: string, tone?: number): <Props, Theme extends ThemeWithPalette>(
    props: Props & { theme: Theme; tone?: number }
  ) => any;

  (key: string, defaultValue?: Exclude<any, number>): <
    Props,
    Theme extends ThemeWithPalette
  >(
    props: Props & { theme: Theme; tone?: number }
  ) => any;

  (key: string, tone: number, defaultValue?: Exclude<any, number>): <
    Props,
    Theme extends ThemeWithPalette
  >(
    props: Props & { theme: Theme }
  ) => any;
}

export const palette: Palette;

export function ifProp<Props, Pass = undefined, Fail = undefined>(
  test: Needle<Props> | Needle<Props>[] | { [key: string]: any },
  pass?: Pass,
  fail?: Fail
): <P = Props>(props?: P) =>
  (Pass extends (...args: any) => any ? ReturnType<Pass> : Pass ) 
  | (Fail extends (...args: any) => any ? ReturnType<Fail> : Fail);

export function ifNotProp<Props, Pass = undefined, Fail = undefined>(
  test: Needle<Props> | Needle<Props>[] | { [key: string]: any },
  pass?: Pass,
  fail?: Fail
): <P = Props>(props?: P) =>
  (Pass extends (...args: any) => any ? ReturnType<Pass> : Pass) 
  | (Fail extends (...args: any) => any ? ReturnType<Fail> : Fail);

export function switchProp<Props, T = undefined, DefaultCase = undefined>(
  needle: Needle<Props>,
  cases: { [key: string]: T } | ((props: Props) => { [key: string]: T }),
  defaultCase?: DefaultCase
): <P = Props>(props?: P) => T | DefaultCase;

export function withProp<Props, T = undefined>(
  needle: Needle<Props> | Needle<Props>[],
  fn: (...args: any[]) => T
): <P = Props>(props?: P) => T;
