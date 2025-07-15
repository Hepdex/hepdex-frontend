import Dropdown from "../../components/Dropdown";
import styled from "styled-components";
import Modal from "../../components/Modal";
import useMutate from "../../hooks/useMutate";
import useSetPageParam from "../../hooks/useSetPageParam";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  BsCheckCircle,
  BsEnvelope,
  BsListUl,
  BsPlusCircle,
  BsThreeDots,
  BsXCircle,
} from "react-icons/bs";
import { flex } from "../../GlobalStyles";
import { notify } from "../../utils/helpers";
import { updateHiredStatus } from "../../services/apiCandidate";
import { useApplicationsContext } from "./ApplicationsBox";

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

export default function ApplicantActions({
  index,
  active,
  currentDataLength,
  application,
  open,
  setOpen,
}) {
  // Applications context
  const { setApplicantsData, setCandidate } = useApplicationsContext();

  // Set page param
  const setPageParam = useSetPageParam(currentDataLength);

  // Button ref
  const buttonRef = useRef(null);

  // Menu ref
  const menuRef = useRef(null);

  // Update hired status api
  const [update] = useMutate(updateHiredStatus);

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

  // Handle update stage
  const handleUpdateStage = async (stage) => {
    // Close menu
    close();

    // Send request
    const response = await update({
      jobID: application.jobID,
      candidateID: application.userID,
      hiredStatus: stage,
    });

    // Check response
    if (response === 200) {
      // Update applicants state
      setApplicantsData((data) => {
        // Updated applicant
        const updatedApplicant = data.find(
          (curr) => curr.userID === application.userID
        );

        // Check if applicant exists
        if (!updatedApplicant) return data;

        // Set applicant status
        updatedApplicant.hiredStatus = stage;

        // Update applicants
        return [...data];
      });

      // Change page param if jobs length is one
      setPageParam();

      // Display message
      notify("Applicant stage updated", "success");
    } else {
      // Display error
      notify(response, "error");
    }
  };

  // Handle view candidate
  function handleViewCandidate() {
    // Close menu
    close();

    // Set candidate
    setCandidate(application);
  }

  return (
    <td className="sticky" onClick={(e) => e.stopPropagation()}>
      <div>
        <div className="action-menu__btn" id={`action-menu__btn--${index}`}>
          <button
            className="sticky-btn"
            ref={buttonRef}
            onClick={() => {
              setOpen((s) =>
                s === application.userID ? undefined : application.userID
              );
            }}
          >
            <BsThreeDots />
          </button>
        </div>
        <Modal>
          {open === application.userID &&
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
                  {["b", "r"].includes(active) && (
                    <li>
                      <button onClick={() => handleUpdateStage("a")}>
                        <BsPlusCircle size={16} />
                        <span>Shortlist candidate</span>
                      </button>
                    </li>
                  )}
                  {active === "a" && (
                    <li>
                      <button onClick={() => handleUpdateStage("h")}>
                        <BsCheckCircle size={16} />
                        <span>Hire candidate</span>
                      </button>
                    </li>
                  )}

                  {!["h", "r"].includes(active) && (
                    <li>
                      <button onClick={() => handleUpdateStage("r")}>
                        <BsXCircle size={16} />
                        <span>Reject candidate</span>
                      </button>
                    </li>
                  )}
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
