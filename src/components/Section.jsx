import Container from "./Container";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";

// Section container
const StyledSection = styled.section`
  padding-top: 72px;

  // Title
  & .title {
    text-align: center;
    ${flex("center")}
    flex-direction: column;
    width: 100%;
    max-width: 620px;
    margin: 0 auto;
    margin-bottom: 40px;
    row-gap: 8px;

    p {
      color: var(--color-grey-2);
    }

    // Large screens
    ${mq(
      "lg",
      css`
        margin-bottom: 56px;
      `
    )}
  }

  // Set padding bottom
  ${(props) =>
    props.$spaceBottom &&
    css`
      padding-bottom: 72px;
      ${mq(
        "lg",
        css`
          padding-bottom: 96px;
        `
      )}
    `}

  // Large screens
  ${mq(
    "lg",
    css`
      padding-top: 96px;
    `
  )}
`;

export default function Section({
  title,
  subtitle,
  children,
  spaceBottom,
  animation = true,
  ...rest
}) {
  return (
    <StyledSection $spaceBottom={spaceBottom} {...rest}>
      <Container>
        {title && (
          <div
            data-aos
            className={`title ${animation ? "custom-fade-up" : ""}`}
          >
            <h1 className="heading-md">{title}</h1>
            {subtitle && <p className="text-md">{subtitle}</p>}
          </div>
        )}
        {children}
      </Container>
    </StyledSection>
  );
}
