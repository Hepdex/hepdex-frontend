import styled from "styled-components";
import Button from "../components/Button";
import DetailsBox from "../components/DetailsBox";
import DashboardBox from "../components/DashboardBox";
import DashboardTitle from "../components/DashboardTitle";
import IconTitle from "../components/IconTitle";
import AvatarImage from "../components/AvatarImage";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { BsHouseDoor, BsPencil } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { capitalizeFirst, notify } from "../utils/helpers";
import { Link } from "react-router-dom";
import { flex } from "../GlobalStyles";
import useMutate from "../hooks/useMutate";
import { uploadLogo } from "../services/apiEmployer";

// Company container
const StyledCompany = styled.div`
  // Company box
  .company-box {
    text-align: center;

    .no-image {
      font-size: 28px;
      line-height: 36px;
    }

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

    &--title {
      text-transform: capitalize;
    }

    &--name {
      color: var(--color-grey-2);
    }
  }
`;

export default function Company() {
  // Document title
  useDocumentTitle("Company");

  // Upload logo
  const [upload, loading] = useMutate(uploadLogo);

  // User context
  const { user, setUser } = useUserContext();

  // Handle upload logo
  const handleUploadLogo = async (e) => {
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
        companyLogo: `${response.url}?t=${Date.now()}`,
      }));

      // Success
      notify("Logo uploaded successfully", "success");
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <StyledCompany>
      <DashboardTitle
        title="Company bio"
        subtitle="Manage company details"
        links={[{ name: "Company" }]}
      />
      <DetailsBox>
        <DashboardBox className="details-box--content">
          <IconTitle
            title="Company details"
            className="title"
            icon={<BsHouseDoor size={18} />}
          />
          <ul>
            <li>
              <span className="name">Name</span>
              <span className="value">{capitalizeFirst(user.companyName)}</span>
            </li>
            <li>
              <span className="name">Size</span>
              <span className="value">{user.companySize}</span>
            </li>
            <li>
              <span className="name">Location</span>
              <span className="value">{capitalizeFirst(user.country)}</span>
            </li>
          </ul>
        </DashboardBox>
        <div className="details-box--side company-box">
          <div className="company-box--file">
            <input
              type="file"
              id="upload-logo"
              name="file"
              accept="image/*"
              disabled={loading}
              onChange={handleUploadLogo}
            />
            <label htmlFor="upload-logo">
              <AvatarImage>
                {user.companyLogo ? (
                  <img alt="company-logo" src={user.companyLogo} />
                ) : (
                  <div className="no-image">{`${user.companyName.at(0)}`}</div>
                )}
              </AvatarImage>
              <button className="edit-image" type="button">
                <BsPencil size={14} />
              </button>
            </label>
          </div>
          <h3 className="company-box--title heading-sm"> {user.companyName}</h3>
          <Button size="sm" as={Link} to="/edit-company">
            Edit bio
          </Button>
        </div>
      </DetailsBox>
    </StyledCompany>
  );
}
