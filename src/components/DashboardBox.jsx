import styled, { css } from "styled-components";
import { mq } from "../GlobalStyles";

// Dashboard box
const StyledDashboardBox = styled.div`
  background-color: var(--color-white-1);
  border-radius: 8px;
  padding: 24px 16px 40px 16px;
  ${mq(
    "sm",
    css`
      padding: 32px 24px 48px 24px;
    `
  )}

  // Title
  h3.title {
    margin-bottom: 20px;
    font-size: 18px;
    line-height: 24px;
  }
`;

export default function DashboardBox({ children, title, ...rest }) {
  return (
    <StyledDashboardBox {...rest}>
      {title && title} {children}
    </StyledDashboardBox>
  );
}
