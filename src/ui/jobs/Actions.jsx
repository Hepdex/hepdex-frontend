import Dropdown from "../../components/Dropdown";
import styled from "styled-components";
import Modal from "../../components/Modal";
import CloseJobModal from "./CloseJobModal";
import { useEffect, useRef, useState } from "react";
import {
  BsCheckCircle,
  BsListUl,
  BsPencil,
  BsThreeDots,
  BsTrash,
  BsXCircle,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { flex } from "../../GlobalStyles";
import { createPortal } from "react-dom";

const ActionBox = styled.div`
  & > div {
    button {
      height: 36px;
      width: 36px;
      position: sticky;
      ${flex("center", "center")}
      border-radius: 50%;
      background-color: transparent;
      transition: background-color 0.4s ease-in-out;
      svg {
        pointer-events: none;
      }
      &:hover {
        background-color: #f3f4f6;
      }
    }
  }
`;

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

export default function Actions({ id, index, active }) {
  // Button ref
  const buttonRef = useRef(null);
  // Menu ref
  const menuRef = useRef(null);
  // Dropdown state
  const [open, setOpen] = useState(false);

  // Close
  const close = () => setOpen(false);

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
  return (
    <td className="sticky">
      <ActionBox>
        <div className="action-menu__btn" id={`action-menu__btn--${index}`}>
          <button ref={buttonRef} onClick={() => setOpen((s) => !s)}>
            <BsThreeDots />
          </button>
        </div>
        <Modal>
          {open &&
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
                    <button>
                      <BsListUl size={16} />
                      <span>View job</span>
                    </button>
                  </li>
                  <li>
                    <Link to={`/edit-job/${id}`} onClick={close}>
                      <BsPencil size={16} />
                      <span>Edit job</span>
                    </Link>
                  </li>

                  <li>
                    {active ? (
                      <Modal.Open opens="close-job">
                        <button onClick={close}>
                          <BsXCircle size={16} />
                          <span>Close job</span>
                        </button>
                      </Modal.Open>
                    ) : (
                      <button>
                        <BsCheckCircle size={16} />
                        <span>Open job</span>
                      </button>
                    )}
                  </li>
                  <li>
                    <button>
                      <BsTrash size={16} />
                      <span>Delete job</span>
                    </button>
                  </li>
                </List>
              </Dropdown>,
              document.body
            )}
          <CloseJobModal id={id} />
        </Modal>
      </ActionBox>
    </td>
  );
}
