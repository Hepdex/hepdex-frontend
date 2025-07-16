import Dropdown from "../../components/Dropdown";
import styled from "styled-components";
import Modal from "../../components/Modal";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BsEnvelope, BsListUl, BsThreeDots } from "react-icons/bs";
import { flex } from "../../GlobalStyles";

const List = styled.ul`
  position: fixed;
  background-color: var(--color-white-1);
  z-index: 10;
  box-shadow: 0 7px 24px 0 #64646f33;
  border-radius: 8px;
  min-width: 200px;
  padding: 1px 4px;
  flex-direction: column;
  ${flex("center")}
  li {
    padding: 3px 0;
    &:not(:last-child) {
      border-bottom: 1px solid #e5e7eb;
    }
    button,
    a {
      padding: 10px;
      background-color: transparent;
      width: 100%;
      ${flex("start", "center")}
      gap: 8px;
      font-size: 15px;
      line-height: 20px;
      border-radius: 4px;
      &:hover {
        color: var(--color-black-1);
        background-color: #f3f4f6;
      }
    }
  }
`;

export default function SourcingActions({
  index,
  candidate,
  setCandidate,
  open,
  setOpen,
}) {
  // Button ref
  const buttonRef = useRef(null);

  // Menu ref
  const menuRef = useRef(null);

  // Close
  const close = () => setOpen(undefined);

  // Update position
  const updatePosition = () => {
    if (buttonRef.current && menuRef.current) {
      // Get button position
      const rect = buttonRef.current.getBoundingClientRect();

      // Menu
      const menu = menuRef.current;

      // Set menu position
      let top = `${rect.bottom}px`;
      let left = `${rect.right - menu.offsetWidth}px`;

      // Check if menu is close to bottom edge
      if (rect.bottom + menu.offsetHeight > window.innerHeight) {
        top = `${rect.top - menu.offsetHeight}px`;
      }

      menu.style.top = top;
      menu.style.left = left;
    }
  };

  // Listener
  useEffect(() => {
    if (open) {
      // Update position
      updatePosition();

      window.addEventListener("scroll", updatePosition);

      window.addEventListener("resize", updatePosition);
    }

    // Clean up
    return () => {
      window.removeEventListener("scroll", updatePosition);

      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  // Handle view candidate
  function handleViewCandidate() {
    // Close menu
    close();

    // Set candidate
    setCandidate(candidate);
  }

  return (
    <td className="sticky" onClick={(e) => e.stopPropagation()}>
      <div>
        <div className="action-menu__btn" id={`action-menu__btn--${index}`}>
          <button
            className="sticky-btn"
            ref={buttonRef}
            onClick={() => {
              setOpen((s) => (s === candidate._id ? undefined : candidate._id));
            }}
          >
            <BsThreeDots />
          </button>
        </div>
        <Modal>
          {open === candidate._id &&
            createPortal(
              <Dropdown
                menuId={`action-menu__${index}`}
                close={close}
                btnId={`action-menu__btn--${index}`}
              >
                <List
                  className="actions-list"
                  id={`action-menu__${index}`}
                  ref={menuRef}
                >
                  <li>
                    <button onClick={handleViewCandidate}>
                      <BsListUl size={16} />
                      <span>View candidate</span>
                    </button>
                  </li>
                  <li>
                    <button>
                      <BsEnvelope size={16} />
                      <span>Send message</span>
                    </button>
                  </li>
                </List>
              </Dropdown>,
              document.body
            )}
        </Modal>
      </div>
    </td>
  );
}
