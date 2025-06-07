import Logo from "./Logo";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";

// Auth box container
const StyledAuthBox = styled.div`
  min-height: 100dvh;
  background-color: var(--color-white-1);
  ${flex("center", "start")}

  // Small screens
  ${mq(
    "sm",
    css`
      align-items: center;
      background-color: #eeeaf8;
    `
  )}

// Links
  a {
    color: var(--color-primary);
    font-weight: 400;
  }

  .auth-box {
    background-color: var(--color-white-1);
    max-width: 520px;
    width: 100%;
    padding: 30px 30px 48px 30px;
    border-radius: 8px;

    // Small screens
    ${mq(
      "sm",
      css`
        box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
      `
    )}

    // Logo
    &--logo {
      ${flex("center")}
      margin-bottom: 20px;
    }

    // Top
    &--top {
      margin-bottom: 16px;
      text-align: center;

      &__title {
        font-size: 32px;
        line-height: 36px;
        font-weight: 500;
        margin-bottom: 4px;
      }

      &__subtitle {
        color: var(--color-grey-2);
      }
    }

    // Submit button
    .submit-box button {
      width: 100%;
    }
  }
`;

export default function AuthBox({ title, subtitle, children }) {
  return (
    <StyledAuthBox>
      <div className="auth-box">
        <div className="auth-box--logo">
          <Logo />
        </div>
        <div className="auth-box--top">
          <h1 className="auth-box--top__title">{title}</h1>
          <p className="auth-box--top__subtitle">{subtitle}</p>
        </div>
        <div className="auth-box--bottom">{children}</div>
      </div>
    </StyledAuthBox>
  );
}
