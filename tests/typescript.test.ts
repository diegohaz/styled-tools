import styled from 'styled-components';
import { prop, ifProp } from '../src';

interface Theme {
  primary: string;
}

const Button = styled.button<{ active?: boolean }>`
  color: ${prop('theme.primary', 'black')};
  background: ${ifProp('active', 'red', 'blue')};
`;

// This test file ensures that the types are compatible with styled-components
// and that the TypeScript compiler does not throw errors when using these helpers.
export const testTypes = () => {
  return Button;
};