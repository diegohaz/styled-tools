import styled, { css } from "styled-components";
import getStyle from "../src/getStyle";

test("no props", () => {
  const Comp = styled.div`
    display: block;
    margin: 10px 20px;
  `;
  expect(getStyle(Comp)).toMatchSnapshot();
});

test("with props", () => {
  const Comp = styled.div`
    display: block;
    margin: ${p1 =>
      css`
        ${p1.mv}px ${p2 => `${p2.mh}px`};
      `};
  `;
  expect(getStyle(Comp, { mv: 10, mh: 20 })).toMatchSnapshot();
});

test("default props", () => {
  const Comp = styled.div`
    display: block;
    margin: ${p1 =>
      css`
        ${p1.mv}px ${p2 => `${p2.mh}px`};
      `};
  `;

  Comp.defaultProps = {
    mv: 10,
    mh: 20
  };
  expect(getStyle(Comp)).toMatchSnapshot();
});

test("error", () => {
  expect(getStyle).toThrow();
});
