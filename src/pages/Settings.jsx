import styled from "styled-components";
import Button from "../components/Button";
import DashboardTitle from "../components/DashboardTitle";
import Modal from "../components/Modal";
import UpdateEmailModal from "../ui/settings/UpdateEmailModal";
import UpdateNameModal from "../ui/settings/UpdateNameModal";
import UpdatePasswordModal from "../ui/settings/UpdatePasswordModal";
import { useUserContext } from "../context/UserContext";
import { BsFileEarmarkText, BsPencil } from "react-icons/bs";
import { capitalizeFirst } from "../utils/helpers";

// Settings box
const SettingsBox = styled.div`
  // Avatar box
  .avatar-box {
    // Name
    &__name {
      text-transform: capitalize;
    }
    // File
    &__file {
      input {
        display: none;
      }
      label {
        cursor: pointer;
      }
    }
  }
`;

export default function Settings() {
  // User context
  const { user } = useUserContext();

  return (
    <SettingsBox>
      <DashboardTitle
        title="Account settings"
        subtitle="Manage account details"
        links={[{ name: "Settings" }]}
      />
      <div className="details-box">
        <div className="dashboard-box details-box__content">
          <h3 className="title icon-title">
            <span className="icon">
              <BsFileEarmarkText size={18} />
            </span>
            Account details
          </h3>
          <Modal>
            <ul className="info">
              <li className="info-item">
                <span className="name">Name</span>
                <span className="value">{`${capitalizeFirst(
                  user.firstName
                )} ${capitalizeFirst(user.lastName)}`}</span>
                <Modal.Open opens="name">
                  <button className="edit">
                    <BsPencil size={14} />
                    Edit
                  </button>
                </Modal.Open>
              </li>
              <li className="info-item">
                <span className="name">Email</span>
                <span className="value">{user.email}</span>
                <Modal.Open opens="email">
                  <button className="edit">
                    <BsPencil size={14} />
                    Edit
                  </button>
                </Modal.Open>
              </li>
              <li className="info-item">
                <span className="name">Password</span>
                <span className="value">********</span>
                <Modal.Open opens="password">
                  <button className="edit">
                    <BsPencil size={14} />
                    Edit
                  </button>
                </Modal.Open>
              </li>
            </ul>
            <UpdateNameModal />
            <UpdateEmailModal />
            <UpdatePasswordModal />
          </Modal>
        </div>
        <div className="side-box avatar-box">
          <div className="avatar-box__image">
            <div className="no-image">{`${user.firstName.at(
              0
            )}${user.lastName.at(0)}`}</div>
          </div>
          <h3 className="avatar-box__name heading-sm">{`${user.firstName} ${user.lastName}`}</h3>
          <div className="avatar-box__file">
            <input type="file" id="upload-image" />
            <Button as="label" size="sm" htmlFor="upload-image">
              Upload photo
            </Button>
          </div>
        </div>
      </div>
    </SettingsBox>
  );
}
