import styled from "styled-components";
import DashboardTitle from "../components/DashboardTitle";
import Modal from "../components/Modal";
import DetailsBox from "../components/DetailsBox";
import UpdateEmailModal from "../ui/settings/UpdateEmailModal";
import UpdateNameModal from "../ui/settings/UpdateNameModal";
import UpdatePasswordModal from "../ui/settings/UpdatePasswordModal";
import DashboardBox from "../components/DashboardBox";
import IconTitle from "../components/IconTitle";
import AvatarImage from "../components/AvatarImage";
import useMutate from "../hooks/useMutate";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ProtectedRoute from "../components/ProtectedRoute";
import { useUserContext } from "../context/UserContext";
import { BsFileEarmarkText, BsPencil } from "react-icons/bs";
import { capitalizeFirst, notify } from "../utils/helpers";
import { flex } from "../GlobalStyles";
import { uploadProfilePicture } from "../services/apiUser";

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
        display: inline-flex;
        cursor: pointer;
        flex-direction: column;
        ${flex(undefined, "center")}
      }
    }
  }
`;

export default function Settings() {
  // Document title
  useDocumentTitle("Settings");

  // User context
  const { user, setUser } = useUserContext();

  // Upload profile image
  const [upload, loading] = useMutate(uploadProfilePicture);

  // Handle upload image
  const handleUploadImage = async (e) => {
    // Get file
    const file = e.target.files[0];

    // Check for file
    if (!file) return;

    // Construct data
    const data = new FormData();
    data.append("file", file);

    // Send request
    const response = await upload(data);

    // Check response
    if (response.url) {
      // Update user
      setUser((user) => ({
        ...user,
        profileImage: `${response.url}?t=${Date.now()}`,
      }));

      // Success
      notify("Image uploaded successfully", "success");
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["employer", "candidate"]}>
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
            <div className="avatar-box--file">
              <input
                accept="image/*"
                type="file"
                disabled={loading}
                id="upload-image"
                onChange={handleUploadImage}
              />
              <label htmlFor="upload-image">
                <AvatarImage>
                  {user.profileImage ? (
                    <img alt="profile-image" src={`${user.profileImage}`} />
                  ) : (
                    <div className="no-image">
                      {`${user.firstName.at(0)}${user.lastName.at(0)}`}
                    </div>
                  )}
                </AvatarImage>
                <button className="edit-image" type="button">
                  <BsPencil size={14} />
                </button>
              </label>
            </div>
            <h3 className="avatar-box--name heading-sm">{`${user.firstName} ${user.lastName}`}</h3>
          </div>
        </DetailsBox>
      </StyledSettings>
    </ProtectedRoute>
  );
}
