import styled, { css } from "styled-components";
import Container from "./Container";
import { flex, mq } from "../GlobalStyles";

// Service container
const StyledService = styled.div`
  height: 100%;

  .service {
    color: var(--color-grey-2);

    &-icon {
      border-radius: 8px;
      height: 80px;
      width: 80px;
      display: inline-block;
      ${flex("center", "center")}
      background-color: var(--color-secondary);
      margin-bottom: 24px;
    }

    &-title {
      font-size: 22px;
      line-height: 32px;
      color: var(--color-black-1);
      margin-bottom: 4px;
    }

    &-text {
      color: var(--color-grey-2);
      width: 100%;

      ${mq(
        "md",
        css`
          max-width: 300px;
        `
      )}
    }
  }
`;

export default function Service({ icon, title, text }) {
  return (
    <Container.Col
      breakPoints={[
        { name: "sm", cols: 2 },
        { name: "900px", cols: 3 },
      ]}
    >
      <StyledService className="service">
        {icon && <span className="service-icon">{icon}</span>}
        <h3 className="service-title">{title}</h3>
        <p className="service-text">{text}</p>
      </StyledService>
    </Container.Col>
  );
}
