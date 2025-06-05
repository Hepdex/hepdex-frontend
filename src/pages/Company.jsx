import styled from "styled-components";
import Button from "../components/Button";
import DetailsBox from "../components/DetailsBox";
import DashboardBox from "../components/DashboardBox";
import DashboardTitle from "../components/DashboardTitle";
import IconTitle from "../components/IconTitle";
import { BsHouseDoor } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { capitalizeFirst } from "../utils/helpers";
import { Link } from "react-router-dom";

// Company container
const StyledCompany = styled.div`
  // Company box
  .company-box {
    text-align: center;

    &--title {
      margin-bottom: 8px;
    }

    &--name {
      color: var(--color-grey-2);
    }
  }
`;

export default function Company() {
  // User context
  const { user } = useUserContext();
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
          <div className="company-box--info">
            <h3 className="heading-sm company-box--title">Company Manager</h3>
            <p className="company-info--name">{user.companyName}</p>
          </div>
          <Button size="sm" as={Link} to="/edit-company">
            Edit bio
          </Button>
        </div>
      </DetailsBox>
    </StyledCompany>
  );
}
