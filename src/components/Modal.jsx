import Button from "./Button";
import styled, { css } from "styled-components";
import { useState } from "react";
import { cloneElement } from "react";
import { useContext } from "react";
import { createContext } from "react";
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
  const [active, setActive] = useState(null);
  // Close
  const close = () => setActive(null);
  // Open
  const open = setActive;
  return (
    <ModalContext.Provider value={{ active, close, open, setActive }}>
      {children}
    </ModalContext.Provider>
  );
}

// Button
function Open({ opens, children }) {
  const { open } = useModalContext();
  return cloneElement(children, {
    onClick: (e) => {
      open(opens);
      children.props.onClick?.(e);
    },
  });
}

// Modal box
const ModalBox = styled.div`
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
    // Header
    &-header {
      padding: 20px;
      ${flex("space-between", "center")}
      border-bottom: 1px solid #e5e7eb;
      // Close
      .close-btn {
        height: 32px;
        ${flex("center", "center")}
        background-color: transparent;
        svg {
          fill: var(--color-grey-2);
        }
      }
    }
    // Body
    &-body {
      padding: 28px 20px;
      ${mq(
        "sm",
        css`
          padding: 28px 48px;
        `
      )}
    }
    // Footer
    &-footer {
      flex-wrap: wrap;
      ${flex("center", "center")}
      gap: 16px;
      padding: 20px;
      background-color: var(--color-grey-1);
    }
  }
`;

// Window
function Window({ name, children, title, confirm }) {
  const { active, close } = useModalContext();
  if (name !== active) return null;
  return createPortal(
    <>
      <div className="overlay" onClick={close} />
      <ModalBox>
        <div className="modal">
          <div className="modal-header">
            <h3 className="modal-header__title icon-title">{title}</h3>
            <button onClick={close} className="close-btn">
              <BsXLg size={16} />
            </button>
          </div>

          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button size="sm" color="secondary" onClick={close}>
              Cancel
            </Button>
            {confirm && confirm}
          </div>
        </div>
      </ModalBox>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
