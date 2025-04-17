import styled, { css } from "styled-components";

// Colors
const colors = {
  primary: css`
    background-color: var(--color-primary);
    color: var(--color-white-1);
    &:hover {
      background-color: var(--color-primary-hover);
    }
  `,
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
};

const Button = styled.button`
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  // Set size
  ${(props) => sizes[props.size ? props.size : "md"]}
  // Set color
  ${(props) => colors[props.color ? props.color : "primary"]}
`;

export default Button;
