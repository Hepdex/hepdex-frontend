import styled, { css } from "styled-components";
import { mq } from "../GlobalStyles";

// Page box
const PageBox = styled.div`
  padding-top: 100px;
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

export default function PageContent({ children }) {
  return <PageBox>{children}</PageBox>;
}
