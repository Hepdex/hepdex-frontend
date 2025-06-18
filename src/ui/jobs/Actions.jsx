import CloseJobModal from "./CloseJobModal";
import DeleteJobModal from "./DeleteJobModal";
import Dropdown from "../../components/Dropdown";
import styled from "styled-components";
import Modal from "../../components/Modal";
import useMutate from "../../hooks/useMutate";
import useSetPageParam from "../../hooks/useSetPageParam";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
import { updateJobStatus } from "../../services/apiJobs";
import { notify } from "../../utils/helpers";
import { useJobsContext } from "../../pages/Jobs";

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

export default function Actions({ jobID, index, active, currentDataLength }) {
  // Jobs context
  const { setJobs } = useJobsContext();

  // Set page param
  const setPageParam = useSetPageParam(currentDataLength);

  // Button ref
  const buttonRef = useRef(null);

  // Menu ref
  const menuRef = useRef(null);

  // Dropdown state
  const [open, setOpen] = useState(false);

  // Open job
  const [openJob] = useMutate(updateJobStatus);

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

  // Handle open job
  const handleOpenJob = async () => {
    // Close menu
    close();

    // Send request
    const response = await openJob({ jobID, active: true });

    // Check response
    if (response === 200) {
      // Update jobs state
      setJobs((data) => {
        const jobs = data.jobs;

        // Updated job
        const updatedJob = jobs.find((job) => job._id === jobID);

        // Check if job exists
        if (!updatedJob) return data;

        // Set job status
        updatedJob.active = true;

        // Update jobs
        return { jobs };
      });

      // Change page param if jobs length is one
      setPageParam();

      // Display message
      notify("Job successfully opened", "success");
    } else {
      // Display error
      notify(response, "error");
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
      <div>
        <div className="action-menu__btn" id={`action-menu__btn--${index}`}>
          <button
            className="sticky-btn"
            ref={buttonRef}
            onClick={() => {
              setOpen((s) => !s);
            }}
          >
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
                    <Link to={`/dashboard/jobs/${jobID}`} onClick={close}>
                      <BsListUl size={16} />
                      <span>View job</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/edit-job/${jobID}`} onClick={close}>
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
                      <button onClick={handleOpenJob}>
                        <BsCheckCircle size={16} />
                        <span>Open job</span>
                      </button>
                    )}
                  </li>
                  <li>
                    <Modal.Open opens="delete-job">
                      <button onClick={close}>
                        <BsTrash size={16} />
                        <span>Delete job</span>
                      </button>
                    </Modal.Open>
                  </li>
                </List>
              </Dropdown>,
              document.body
            )}
          <CloseJobModal jobID={jobID} currentDataLength={currentDataLength} />
          <DeleteJobModal jobID={jobID} currentDataLength={currentDataLength} />
        </Modal>
      </div>
    </td>
  );
}
