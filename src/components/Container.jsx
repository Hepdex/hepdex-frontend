import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";

// Container
const ContainerDiv = styled.div`
  width: 100%;
  padding: 0 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;

  ${mq(
    "xl",
    css`
      max-width: 1200px;
    `
  )}
`;

// Row
const RowDiv = styled.ul`
  ${flex()}
  margin-left: -10px;
  margin-right: -10px;
  flex-wrap: wrap;
  ${(props) =>
    props.$gap &&
    css`
      row-gap: ${props.$gap + "px"};
    `}
  ${mq(
    "xs",
    css`
      margin-left: -15px;
      margin-right: -15px;
    `
  )}
`;

// Column
const ColDiv = styled.li`
  padding: 0 10px;
  ${mq(
    "xs",
    css`
      padding: 0 15px;
    `
  )}
  // Set default columns
  ${(props) =>
    props?.$defaultCols
      ? css`
          width: ${100 / props.$defaultCols + "%"};
        `
      : css`
          width: 100%;
        `}
    // Set breakpoints
    ${(props) =>
    props.$breakPoints &&
    props.$breakPoints.map(
      (breakPoint) => css`
        ${mq(
          breakPoint.name,
          css`
            width: ${breakPoint.cols
              ? 100 / breakPoint.cols + "%"
              : breakPoint.width + "%"};
          `
        )}
      `
    )}
`;

function Container({ children }) {
  return <ContainerDiv>{children}</ContainerDiv>;
}

function Row({ children, gap = 24, className = "", ...rest }) {
  return (
    <RowDiv $gap={gap} className={className} {...rest}>
      {children}
    </RowDiv>
  );
}

function Col({ children, breakPoints, defaultCols, className = "" }) {
  return (
    <ColDiv
      $breakPoints={breakPoints}
      $defaultCols={defaultCols}
      className={className}
    >
      {children}
    </ColDiv>
  );
}

Container.Row = Row;
Container.Col = Col;

export default Container;
