import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";

const Li = styled.li`
  .icon {
    ${flex("center", "center")}
    min-height: 100%;
    flex-direction: column;
    .circle {
      height: 48px;
      width: 48px;
      border: 1px solid var(--color-primary);
      border-radius: 50%;
      font-size: 28px;
      line-height: 48px;
      font-weight: 700;
      ${flex("center", "center")}
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
    .arrow {
      width: 0px;
      border-right: 1px solid var(--color-primary);
      min-height: 70px;
      flex: 1;
    }
  }
  ${flex("center", "stretch")}
  column-gap: 16px;
  ${mq(
    "sm",
    css`
      column-gap: 40px;
    `
  )}
  .content {
    max-width: 500px;
    padding-bottom: 24px;
    .step-title {
      font-size: 22px;
      line-height: 28px;
      margin-bottom: 4px;
      ${mq(
        "sm",
        css`
          font-size: 24px;
          line-height: 32px;
          margin-bottom: 8px;
        `
      )}
    }
  }
`;

export default function Step({ number, title, text }) {
  return (
    <Li>
      <div className="icon">
        <div className="circle">{number}</div>
        <div className="arrow"></div>
      </div>
      <div className="content">
        <h3 className="step-title">{title}</h3>
        <p className="text-md">{text}</p>
      </div>
    </Li>
  );
}
