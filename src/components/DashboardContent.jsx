import Container from "../components/Container";
import styled, { css } from "styled-components";
import { mq } from "../GlobalStyles";
import { useDashboardContext } from "../context/DashboardContext";

const Main = styled.main`
  background-color: #f3f4f6;
  min-height: calc(100dvh - 70px);
  margin-top: 70px;
  ${mq(
    "md",
    css`
      margin-left: 68px;
    `
  )}
  // Container
  & > div {
    padding: 32px 16px;
    height: 100%;
    ${mq(
      "md",
      css`
        padding-left: 40px;
        padding-right: 40px;
      `
    )}
  }
  // Open nav
  ${(props) =>
    props.$isNavOpen &&
    css`
      ${mq(
        "md",
        css`
          margin-left: 250px;
        `
      )}
    `}
`;

export default function DashboardContent({ children }) {
  // Get dashboard context
  const { isNavOpen } = useDashboardContext();
  return (
    <Main $isNavOpen={isNavOpen}>
      <Container mw="100%">{children}</Container>
    </Main>
  );
}
