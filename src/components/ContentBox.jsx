import styled from "styled-components";

const StyledContentBox = styled.div`
  background-color: var(--color-white-1);
  padding: 24px;
  border-radius: 4px;
  border: 1px solid var(--color-grey-3);

  h2 {
    margin: 30px 0 12px;
  }

  h3 {
    margin: 8px 0 8px;
  }

  p {
    margin-bottom: 20px;
  }

  a {
    color: var(--color-primary-hover);
  }

  ul,
  ol {
    margin-left: 20px;
    margin-bottom: 20px;
    list-style-position: outside;
  }

  ul {
    li {
      list-style: disc;
    }
  }

  ol {
    li {
      list-style: none;
    }
  }

  ul,
  ol,
  p {
    font-size: 18px;
  }
`;

export default function ContentBox({ children }) {
  return <StyledContentBox>{children}</StyledContentBox>;
}
