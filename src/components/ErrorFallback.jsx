import Button from "./Button";
import styled from "styled-components";
import GlobalStyles, { flex } from "../GlobalStyles";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";

const StyledErrorFallback = styled.main`
  ${flex("center", "center")}
  min-height: 100vh;

  h1 {
    font-weight: 500;
    font-size: 36px;
    line-height: 44px;
  }

  p {
    color: var(--color-grey-2);
    margin: 16px 0;
    font-size: 18px;
  }
`;

const Box = styled.div`
  padding: 4.8rem 16px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
`;

export default function ErrorFallback({ error, resetErrorBoundary }) {
  // Document title
  useDocumentTitle("Something went wrong");

  const navigate = useNavigate();
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <h1>Something went wrong 🤔</h1>
          <p>{error.message}</p>
          <Button
            size="md"
            onClick={() => {
              resetErrorBoundary();
              navigate("/home");
            }}
          >
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
