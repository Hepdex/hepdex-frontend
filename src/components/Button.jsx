import styled, { css } from "styled-components";
import { flex } from "../GlobalStyles";

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

  // Danger
  error: css`
    background-color: var(--color-error);
    color: var(--color-white-1);

    &:hover {
      background-color: #d12f1e;
    }
  `,

  // Secondary
  secondary: css`
    background-color: var(--color-white-1);
    color: var(--color-grey-2);
    border: 1px solid var(--color-grey-3);

    svg {
      transition: fill 0.4s ease-in-out;
    }

    &:hover {
      background-color: var(--color-secondary);
      border: 1px solid var(--color-primary-hover);
      color: var(--color-black-1);

      &:not(.alternate) {
        svg {
          fill: var(--color-primary-hover);
        }
      }
    }

    &.alternate {
      &:hover {
        background-color: #f3f4f6;
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
    min-height: 64px;
  `,

  // md
  md: css`
    padding: 12px 32px !important;
    min-height: 48px;
    max-height: 48px;
  `,

  // sm
  sm: css`
    padding: 0px 16px;
    font-size: 15px;
    font-weight: 400;
    min-height: 40px;
    max-height: 40px;
    min-width: 88px;
  `,

  // xs
  xs: css`
    font-size: 15px;
    padding: 0px 16px;
    line-height: 20px;
    min-height: 32px;
    font-weight: 400;

    // Spinner
    .spinner {
      svg {
        width: 20px;
        height: 20px;
      }
    }
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
  position: relative;
  font-weight: 500;

  // Set size
  ${(props) => sizes[props.size ? props.size : "md"]}

  // Set color
  ${(props) => colors[props.color ? props.color : "primary"]}

  // Set loading styles
  ${(props) =>
    props.$loading &&
    css`
      span {
        visibility: hidden;
      }
    `}

  // Spinner
  .spinner {
    ${flex("center", "center")}
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Button;
