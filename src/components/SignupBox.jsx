import Logo from "../components/Logo";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft, BsCheck } from "react-icons/bs";
import { BiLock, BiUserPlus } from "react-icons/bi";

// Signup box styles
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

// Aside styles
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
      width: 35%;
      max-width: 480px;
      padding: 24px;
      position: fixed;
      z-index: 10;
      min-height: 100vh;
      top: 0;
      left: 0;
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
      padding: 4rem 0rem 2rem 0rem;
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

// Content box styles
const StyledContent = styled.div`
  background-color: #f3f4f6;
  flex: 1;
  position: relative;

  ${mq(
    "md",
    css`
      margin-left: min(35%, 480px);
    `
  )}

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
    min-height: 100vh;

    ${(props) =>
      props.$showTop
        ? css`
            padding: 145px 16px 48px 16px;

            ${mq(
              "400px",
              css`
                padding: 112px 16px 48px 16px;
              `
            )}
          `
        : css`
            padding: 112px 16px 48px 16px;
          `}

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
        margin-bottom: 40px;

        .title {
          font-size: 32px;
          font-weight: 500;
          line-height: 36px;
        }

        .subtitle {
          color: var(--color-grey-2);
          margin-top: 16px;
        }
      }
    }
  }
`;

// Steps box styles
const StyledSteps = styled.div`
  margin-top: 48px;
  ul {
    ${flex(undefined)}
    flex-direction: column;

    li {
      ${flex(undefined, "start")}
      gap: 16px;

      h3 {
        font-weight: 500;
        font-size: 20px;
        margin-top: 8px;
        color: rgba(255, 255, 255, 0.7);
      }

      .icon {
        ${flex("center", "center")}
        flex-direction: column;

        .step {
          min-width: 40px;
          border-radius: 50%;
          height: 40px;
          ${flex("center", "center")}
          background: #fff3;
          border: 2px solid rgba(255, 255, 255, 0.3);
          font-weight: 600;
        }

        .arrow {
          width: 0px;
          border-right: 2px solid rgba(255, 255, 255, 0.3);
          min-height: 48px;
          flex: 1;
        }
      }

      &:last-child {
        .icon {
          .arrow {
            display: none;
          }
        }
      }

      &.active {
        h3 {
          color: var(--color-white-1);
        }
        .icon {
          .step {
            background-color: var(--color-white-1);
            color: var(--color-primary);
          }
        }
      }
    }
  }

  .user-details {
    margin-top: 40px;
    ${flex("center", "start")}
    flex-direction: column;
    gap: 16px;

    p {
      font-size: 18px;
    }

    button {
      background-color: transparent;
      ${flex(undefined, "center")}
      gap: 4px;
      transition: color 0.4s ease-in-out;

      span {
        margin-top: 2px;
      }

      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
`;

// Signup box
function SignupBox({ children }) {
  return <StyledSignupBox>{children}</StyledSignupBox>;
}

// Left - Aside
function Left({ children, showPattern = true }) {
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

// Content box
function Content({ children, showTop = true, title = "", subtitle = "" }) {
  // Navigate hook
  const navigate = useNavigate();

  return (
    <StyledContent $showTop={showTop}>
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

// Steps box
function Steps({ step = 1, email = "" }) {
  // Navigate hook
  const navigate = useNavigate();

  // Logout user
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to signup page
    navigate("/signup");
  };

  return (
    <StyledSteps>
      <ul>
        <li className={step === 1 ? "active" : ""}>
          <div className="icon">
            <span className="step">{step > 1 ? <BsCheck size={24} /> : 1}</span>
            <div className="arrow"></div>
          </div>
          <h3>Sign up</h3>
        </li>
        <li className={step === 2 ? "active" : ""}>
          <div className="icon">
            <span className="step">{step > 2 ? <BsCheck size={24} /> : 2}</span>
            <div className="arrow"></div>
          </div>
          <h3>Basic information</h3>
        </li>
        <li className={step === 3 ? "active" : ""}>
          <div className="icon">
            <span className="step">{step > 3 ? <BsCheck size={24} /> : 3}</span>
            <div className="arrow"></div>
          </div>
          <h3>Confirm email</h3>
        </li>
      </ul>
      <div className="user-details">
        <p>{email}</p>
        <button className="user-details--logout" onClick={handleLogout}>
          <BiLock size={18} /> <span>Logout</span>
        </button>
      </div>
    </StyledSteps>
  );
}

SignupBox.Left = Left;
SignupBox.Content = Content;
SignupBox.Steps = Steps;

export default SignupBox;
