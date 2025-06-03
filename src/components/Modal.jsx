import Button from "./Button";
import styled, { css } from "styled-components";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { BsXLg } from "react-icons/bs";
import { flex, mq } from "../GlobalStyles";

// Create context
const ModalContext = createContext();

// Use context
export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined)
    throw new Error("ModalContext was used outside provider");

  return context;
};

// Modal
function Modal({ children }) {
  // Active state
  const [active, setActive] = useState(null);

  // Close modal
  const close = () => setActive(null);

  // Open modal
  const open = setActive;

  return (
    <ModalContext.Provider value={{ active, close, open, setActive }}>
      {children}
    </ModalContext.Provider>
  );
}

// Button
function Open({ opens, children }) {
  // Get context
  const { open } = useModalContext();

  // Clone child with onClick event
  return cloneElement(children, {
    onClick: (e) => {
      open(opens);
      children.props.onClick?.(e);
    },
  });
}

// Window styles
const StyledWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  padding: 0 16px;
  width: 100%;
  max-width: 570px;

  .modal {
    background-color: var(--color-white-1);
    border-radius: 8px;
    overflow: hidden;

    &--header {
      padding: 20px;
      ${flex("space-between", "center")}
      border-bottom: 1px solid #e5e7eb;

      // Close button
      &__close {
        height: 32px;
        ${flex("center", "center")}
        background-color: transparent;

        svg {
          fill: var(--color-grey-2);
        }
      }
    }

    &--body {
      padding: 28px 20px;
      ${mq(
        "sm",
        css`
          padding: 28px 48px;
        `
      )}
    }

    &--footer {
      ${flex("center", "center")}
      flex-wrap: wrap;
      gap: 16px;
      padding: 20px;
      background-color: var(--color-grey-1);
    }

    // Confirm modal
    &.modal-confirm {
      text-align: center;

      .modal {
        &--header {
          border-bottom: none;
          justify-content: end;
        }

        &--body {
          padding-top: 0px;
        }

        &--footer {
          background-color: var(--color-white-1);
          padding: 0px 20px 40px 20px;
        }
      }

      .confirm-content {
        ${flex("center")}
        flex-direction: column;
        gap: 12px;

        p {
          color: var(--color-grey-2);
          max-width: 400px;
          width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
`;

// Window
function Window({ name, children, title, confirm, alt = false }) {
  // Get context
  const { active, close } = useModalContext();

  // Check if window is active
  if (name !== active) return null;

  return createPortal(
    <>
      <div className="overlay" onClick={close} />
      <StyledWindow>
        <div className={`modal ${alt ? "modal-confirm" : ""}`}>
          <div className="modal--header">
            {title && title}
            <button onClick={close} className="modal--header__close">
              <BsXLg size={16} />
            </button>
          </div>
          <div className="modal--body">{children}</div>
          <div className="modal--footer">
            <Button
              size="sm"
              color="secondary"
              className={`${alt ? "alternate" : ""}`}
              onClick={close}
            >
              Cancel
            </Button>
            {confirm && confirm}
          </div>
        </div>
      </StyledWindow>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
