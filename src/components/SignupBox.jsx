import Logo from "../components/Logo";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { BiUserPlus } from "react-icons/bi";

const StyledSignupBox = styled.div`
  min-height: 100vh;
  ${flex(undefined)}
  flex-direction: column;

  ${mq(
    "md",
    css`
      flex-direction: row;
    `
  )}
`;

const StyledLeft = styled.div`
  padding: 24px 16px;
  background: linear-gradient(135deg, #915dc2 0%, #7b4db8 100%);
  position: relative;
  ${flex("center")}
  flex-direction: column;
  color: white;
  max-height: 84px;

  ${mq(
    "md",
    css`
      flex: 0 0 35%;
      max-width: 480px;
      padding: 24px;
      max-height: none;
    `
  )}

  ${mq(
    "978px",
    css`
      padding: 48px;
    `
  )}

  .bottom {
    flex: 1;
    display: none;
    margin-top: 16px;

    ${mq(
      "md",
      css`
        display: block;
      `
    )}

    ${mq(
      "978px",
      css`
        margin-top: 40px;
      `
    )}

    .pattern {
      display: none;
      flex-direction: column;
      padding: 4rem 2rem 2rem 2rem;
      gap: 4px;

      ${mq(
        "978px",
        css`
          ${flex("center")}
        `
      )}

      &-row {
        ${flex(undefined)}
        gap: 8px;
        &:nth-child(even) {
          margin-left: 20px;
        }

        &--circle {
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
        }
      }
    }

    .content {
      .signup-icon {
        ${flex("center", "center")}
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-bottom: 16px;
        background-color: var(--color-secondary);

        svg {
          fill: var(--color-primary);
        }
      }

      h2 {
        font-weight: 500;
        font-size: 28px;
        line-height: 32px;
        margin-bottom: 8px;
      }
    }
  }
`;

const StyledContent = styled.div`
  background-color: #f3f4f6;
  flex: 1;
  position: relative;

  .top {
    ${flex(undefined, "start")}
    position: absolute;
    flex-direction: column;
    column-gap: 16px;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #d5d5d5;
    padding: 16px;
    max-height: auto;

    ${mq(
      "400px",
      css`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `
    )}

    ${mq(
      "md",
      css`
        padding: 16px 32px;
      `
    )}

    button {
      ${flex("center", "center")}
      background-color: transparent;
      gap: 8px;
      height: 40px;
    }

    a {
      color: var(--color-primary);
    }
  }

  .bottom {
    padding: 145px 16px 48px 16px;
    min-height: 100vh;

    ${mq(
      "400px",
      css`
        padding: 112px 16px 48px 16px;
      `
    )}

    ${mq(
      "md",
      css`
        padding: 128px 32px 48px 32px;
      `
    )}

    .content {
      max-width: 650px;
      margin: 0 auto;
      width: 100%;

      .title-subtitle {
        text-align: center;
        margin-bottom: 32px;

        .title {
          font-size: 32px;
          font-weight: 500;
          line-height: 36px;
        }
      }
    }
  }
`;

function SignupBox({ children }) {
  return <StyledSignupBox>{children}</StyledSignupBox>;
}

function Left({ children, showPattern = true, title = "" }) {
  return (
    <StyledLeft>
      <div className="top">
        <Logo alt url="/home" />
      </div>
      <div className="bottom">
        <div className="content">
          <div className="signup-icon">
            <BiUserPlus size={24} />
          </div>
          {title && <h2>{title}</h2>}
          {children}
        </div>
        {showPattern && (
          <div className="pattern">
            {[...Array(6)].map((_, row) => (
              <div key={row} className="pattern-row">
                {[...Array(8)].map((_, col) => (
                  <div key={col} className="pattern-row--circle pulse" />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </StyledLeft>
  );
}

function Content({ children, showTop = true, title = "", subtitle = "" }) {
  // Navigate hook
  const navigate = useNavigate();

  return (
    <StyledContent>
      {showTop && (
        <div className="top">
          <button className="back" onClick={() => navigate(-1)}>
            <BsArrowLeft size={20} />
            <span>Previous</span>
          </button>
          <p>
            Already have an account? <Link to="/login"> Log in</Link>
          </p>
        </div>
      )}
      <div className="bottom">
        <div className="content">
          {title && (
            <div className="title-subtitle">
              <h1 className="title">{title}</h1>
              {subtitle && <p className="subtitle">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </div>
    </StyledContent>
  );
}

SignupBox.Left = Left;
SignupBox.Content = Content;

export default SignupBox;
