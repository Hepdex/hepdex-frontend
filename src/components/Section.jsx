import styled, { css } from "styled-components";
import Container from "./Container";
import { flex, mq } from "../GlobalStyles";

const SectionDiv = styled.section`
  padding-top: 72px;
  ${mq(
    "lg",
    css`
      padding-top: 96px;
    `
  )}

  & .title {
    text-align: center;
    ${flex("center")}
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    margin-bottom: 40px;
    row-gap: 8px;
    ${mq(
      "lg",
      css`
        margin-bottom: 56px;
      `
    )}
    p {
      color: var(--color-grey-2);
    }
  }
  // Set margin
  ${(props) =>
    props.$marginBottom &&
    css`
      padding-bottom: 72px;
      ${mq(
        "lg",
        css`
          padding-bottom: 96px;
        `
      )}
    `}
`;

export default function Section({
  title,
  subtitle,
  children,
  marginBottom,
  animation = true,
}) {
  return (
    <SectionDiv $marginBottom={marginBottom}>
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
    </SectionDiv>
  );
}
