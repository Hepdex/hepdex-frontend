import styled, { css } from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { flex, mq } from "../GlobalStyles";
import Container from "../components/Container";
import Logo from "../components/Logo";
import { BsXLg } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";

const LayoutBox = styled.main`
  background-color: #f3f4f6;
  min-height: 100dvh;
  // Header
  .header {
    ${flex("space-between", "center")}
    padding-top: 24px;
    .close-page {
      min-height: 36px;
      ${flex("center", "center")}
      background-color: transparent;
      svg {
        fill: var(--color-grey-2);
      }
    }
  }
  // Form box
  .form-box {
    padding: 48px 0px;
    ${mq(
      "md",
      css`
        padding: 64px 0px;
      `
    )}
    max-width: 580px;
    margin: 0 auto;
    &__content {
      ${flex("center")}
      flex-direction: column;
      gap: 8px;
      margin-bottom: 32px;
      p {
        color: var(--color-grey-2);
      }
    }
    // Form
    form {
      .form-content {
        ${flex("center")}
        flex-direction: column;
        row-gap: 18px;
        // Radio group
        .radio-group {
          ${flex(undefined, "center")}
          column-gap: 32px;
          row-gap: 18px;
          flex-wrap: wrap;
          .radio-box {
            label {
              ${flex(undefined, "center")}
              gap: 8px;
              &,
              input {
                cursor: pointer;
              }
              input {
                height: 20px;
                width: 20px;
                border: 2px solid;
                border-color: var(--color-grey-2);
                border-radius: 50%;
                box-sizing: border-box;
                appearance: none;
                position: relative;
                &:checked,
                &:hover {
                  border-color: var(--color-primary);
                }
                &:checked::after {
                  position: absolute;
                  width: 10px;
                  height: 10px;
                  content: "";
                  display: block;
                  border-radius: 50%;
                  background-color: var(--color-primary);
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
          }
        }
        // Pay details
        .pay-details {
          ${flex("center")}
          gap: 18px;
          flex-direction: column;
        }
      }
    }
  }
`;

export default function AltLayout() {
  // User context
  const { user } = useUserContext();
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <LayoutBox>
      <Container mw="1400px">
        <div className="header">
          <Logo url={location.pathname} />
          <button onClick={() => navigate(-1)} className="close-page">
            <BsXLg size={18} />
          </button>
        </div>
        {user && <Outlet />}
      </Container>
    </LayoutBox>
  );
}
