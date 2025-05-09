import styled, { css } from "styled-components";

// Colors
const colors = {
  // Primary
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-white-1);
    &:hover {
      background-color: var(--color-primary-hover);
    }
  `,
  // Secondary
  secondary: css`
    background-color: var(--color-white-1);
    color: var(--color-grey-2);
    border: 1px solid var(--color-grey-3);
    &:hover {
      background-color: var(--color-secondary);
      border: 1px solid var(--color-primary-hover);
      color: var(--color-black-1);
    }
    &.alternate {
      &:hover {
        background-color: var(--color-grey-1);
        border: 1px solid #757575;
      }
    }
  `,
  // Outline
  outline: css`
    background-color: transparent;
    border: 1px solid var(--color-black-1);
    color: var(--color-black-1);
    &:hover {
      background-color: var(--color-black-1);
      color: var(--color-white-1);
      border: 1px solid var(--color-black-1);
    }
  `,
};

// Sizes
const sizes = {
  // lg
  lg: css`
    padding: 20px 32px;
    max-height: 64px;
  `,
  // md
  md: css`
    padding: 12px 32px !important;
    max-height: 48px;
  `,
  // sm
  sm: css`
    padding: 0px 16px;
    font-size: 15px;
    font-weight: 400;
    line-height: 40px;
    max-height: 40px;
    min-width: 96px;
    border-radius: 4px;
  `,
};

const Button = styled.button`
  // Default styles
  border-radius: 8px;
  transition: all 0.4s ease-in-out;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  font-weight: 500;
  // Set size
  ${(props) => sizes[props.size ? props.size : "md"]}
  // Set color
  ${(props) => colors[props.color ? props.color : "primary"]}
`;

export default Button;
