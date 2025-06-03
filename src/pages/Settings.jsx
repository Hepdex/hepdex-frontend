import styled from "styled-components";
import Button from "../components/Button";
import DashboardTitle from "../components/DashboardTitle";
import Modal from "../components/Modal";
import DetailsBox from "../components/DetailsBox";
import UpdateEmailModal from "../ui/settings/UpdateEmailModal";
import UpdateNameModal from "../ui/settings/UpdateNameModal";
import UpdatePasswordModal from "../ui/settings/UpdatePasswordModal";
import DashboardBox from "../components/DashboardBox";
import IconTitle from "../components/IconTitle";
import AvatarImage from "../components/AvatarImage";
import { useUserContext } from "../context/UserContext";
import { BsFileEarmarkText, BsPencil } from "react-icons/bs";
import { capitalizeFirst } from "../utils/helpers";

// Settings container
const StyledSettings = styled.div`
  // Avatar box
  .avatar-box {
    // Name
    &--name {
      text-transform: capitalize;
    }

    // File
    &--file {
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
    <StyledSettings>
      <DashboardTitle
        title="Account settings"
        subtitle="Manage account details"
        links={[{ name: "Settings" }]}
      />
      <DetailsBox>
        <DashboardBox className="details-box--content">
          <IconTitle
            title="Account details"
            icon={<BsFileEarmarkText size={18} />}
            className="title"
          />
          <Modal>
            <ul>
              <li>
                <span className="name">Name</span>
                <span className="value">{`${capitalizeFirst(
                  user.firstName
                )} ${capitalizeFirst(user.lastName)}`}</span>
                <Modal.Open opens="name">
                  <button>
                    <BsPencil size={14} />
                    Edit
                  </button>
                </Modal.Open>
              </li>
              <li>
                <span className="name">Email</span>
                <span className="value">{user.email}</span>
                <Modal.Open opens="email">
                  <button>
                    <BsPencil size={14} />
                    Edit
                  </button>
                </Modal.Open>
              </li>
              <li>
                <span className="name">Password</span>
                <span className="value">********</span>
                <Modal.Open opens="password">
                  <button>
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
        </DashboardBox>
        <div className="details-box--side avatar-box">
          <AvatarImage>
            <div className="no-image">
              {`${user.firstName.at(0)}${user.lastName.at(0)}`}
            </div>
          </AvatarImage>
          <h3 className="avatar-box--name heading-sm">{`${user.firstName} ${user.lastName}`}</h3>
          <div className="avatar-box--file">
            <input type="file" id="upload-image" />
            <Button as="label" size="sm" htmlFor="upload-image">
              Upload photo
            </Button>
          </div>
        </div>
      </DetailsBox>
    </StyledSettings>
  );
}
