import { Interpolation, ThemeProps } from 'styled-components';

export type PropType = string | number | ((props: any) => any);

export function prop(path: string, defaultValue?: any): (props: ThemeProps<any>) => any;
export function ifProp(test: string | object, then?: any, otherwise?: any): (props: ThemeProps<any>) => any;
export function switchProp(path: string, cases: object, defaultValue?: any): (props: ThemeProps<any>) => any;
export function withProp(path: string | string[], fn: (...args: any[]) => any): (props: ThemeProps<any>) => any;
export function ifNotProp(test: string | object, then?: any, otherwise?: any): (props: ThemeProps<any>) => any;