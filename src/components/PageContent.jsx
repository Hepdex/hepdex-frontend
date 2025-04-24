import styled from "styled-components";

const Page = styled.div`
  padding-top: 100px;

  & > section {
    padding-top: 64px;
  }
`;
export default function PageContent({ children }) {
  return <Page>{children}</Page>;
}
