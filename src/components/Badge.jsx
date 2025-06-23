import styled from "styled-components";
import { flex } from "../GlobalStyles";

// Badge container
const StyledBadge = styled.span`
  ${flex("center", "center")}
  display: inline-flex;
  border-radius: 4px;
  gap: 4px;
  padding: 0 8px;
  height: 24px;
  font-size: 14px;
  line-height: 24px;
  color: var(--color-black-1);

  &.md {
    border-radius: 8px;
    gap: 8px;
    font-weight: 500;
    padding: 0px 16px;
    font-size: 15px;
    line-height: 40px;
    font-weight: 400;
    height: 40px;
    min-width: 88px;
  }

  &::first-letter {
    text-transform: uppercase;
  }

  // Success
  &.success {
    background-color: #e2f6e9;

    svg {
      fill: var(--color-success);
    }
  }

  // Neutral
  &.neutral {
    background-color: #f3f4f6;
  }

  // Dark
  &.dark {
    background-color: #838383;
    color: var(--color-white-1);
  }
`;

export default function Badge({ className, children }) {
  return <StyledBadge className={className}>{children}</StyledBadge>;
}
