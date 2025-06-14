import styled from "styled-components";
import { flex } from "../GlobalStyles";

// Badge container
const StyledBadge = styled.span`
  ${flex("center", "center")}
  display: inline-flex;
  border-radius: 8px;
  gap: 6px;
  padding: 4px 10px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-black-1);

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
