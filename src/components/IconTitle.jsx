import styled from "styled-components";
import { flex } from "../GlobalStyles";

// Icon title
const StyledIconTitle = styled.h3`
  ${flex(undefined, "center")}
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  gap: 12px;

  // Icon box
  .icon {
    ${flex("center", "center")}
    border-radius: 8px;
    height: 32px;
    width: 32px;
    background-color: var(--color-secondary);

    svg {
      fill: var(--color-primary);
    }
  }
`;

export default function IconTitle({ icon, title, ...rest }) {
  return (
    <StyledIconTitle {...rest}>
      {icon && <span className="icon">{icon}</span>}
      {title}
    </StyledIconTitle>
  );
}
