import styled, { css } from "styled-components";
import { mq } from "../GlobalStyles";

// Page content container
const StyledPageContent = styled.div`
  padding-top: 100px;

  &.dark {
    background-color: #f3f4f6;
  }

  & > section:first {
    padding-top: 48px;
    ${mq(
      "sm",
      css`
        padding-top: 64px;
      `
    )}
  }
`;

export default function PageContent({ children, className = "" }) {
  return (
    <StyledPageContent className={className}>{children}</StyledPageContent>
  );
}
