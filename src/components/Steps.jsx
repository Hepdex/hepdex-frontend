import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";

// Steps container
const StyledSteps = styled.ul`
  ${flex("center")}
  flex-direction: column;

  li:last-child {
    .step {
      &-icon {
        align-self: flex-start;

        &--arrow {
          display: none;
        }
      }

      &-content {
        padding-bottom: 0px;
      }
    }
  }
`;

// Step styles
const StyledStep = styled.li`
  ${flex("center", "stretch")}
  column-gap: 16px;

  .step {
    // Step icon
    &-icon {
      ${flex("center", "center")}
      min-height: 100%;
      flex-direction: column;

      &--circle {
        ${flex("center", "center")}
        height: 48px;
        width: 48px;
        border: 1px solid var(--color-primary);
        border-radius: 50%;
        font-size: 28px;
        line-height: 48px;
        font-weight: 700;

        // Small screens
        ${mq(
          "sm",
          css`
            height: 72px;
            width: 72px;
            font-size: 32px;
            line-height: 72px;
          `
        )}
      }

      &--arrow {
        width: 0px;
        border-right: 1px solid var(--color-primary);
        min-height: 70px;
        flex: 1;
      }
    }

    &-content {
      max-width: 500px;
      padding-bottom: 24px;

      &--title {
        font-size: 22px;
        line-height: 28px;
        margin-bottom: 4px;

        // Small screens
        ${mq(
          "sm",
          css`
            font-size: 24px;
            line-height: 32px;
          `
        )}
      }
    }
  }

  // Small screens
  ${mq(
    "sm",
    css`
      column-gap: 40px;
    `
  )}
`;

function Steps({ children }) {
  return <StyledSteps>{children}</StyledSteps>;
}

function Step({ number, title, text }) {
  return (
    <StyledStep className="step">
      <div className="step-icon">
        <div className="step-icon--circle">{number}</div>
        <div className="step-icon--arrow" />
      </div>
      <div className="step-content">
        <h3 className="step-content--title">{title}</h3>
        <p className="text-md">{text}</p>
      </div>
    </StyledStep>
  );
}

Steps.Step = Step;

export default Steps;
