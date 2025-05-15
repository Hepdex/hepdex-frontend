import styled from "styled-components";
import Button from "../components/Button";
import DashboardTitle from "../components/DashboardTitle";
import { BsHouseDoor } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { capitalizeFirst } from "../utils/helpers";
import { Link } from "react-router-dom";

const CompanyBox = styled.div`
  .company-info {
    text-align: center;
    &__title {
      margin-bottom: 4px;
    }
    &__name {
      color: var(--color-grey-2);
    }
  }
`;

export default function Company() {
  const { user } = useUserContext();
  return (
    <CompanyBox>
      <DashboardTitle
        title="Company bio"
        subtitle="Manage company details"
        links={[{ name: "Company" }]}
      />
      <div className="details-box">
        <div className="dashboard-box details-box__content">
          <h3 className="title icon-title">
            <span className="icon">
              <BsHouseDoor size={18} />
            </span>
            Company details
          </h3>
          <ul className="info">
            <li className="info-item">
              <span className="name">Name</span>
              <span className="value">{capitalizeFirst(user.companyName)}</span>
            </li>
            <li className="info-item">
              <span className="name">Size</span>
              <span className="value">{user.companySize}</span>
            </li>
            <li className="info-item">
              <span className="name">Location</span>
              <span className="value">{capitalizeFirst(user.country)}</span>
            </li>
          </ul>
        </div>
        <div className="side-box ">
          <div className="company-info">
            <h3 className="heading-sm company-info__title">Company Manager</h3>
            <p className="company-info__name">{user.companyName}</p>
          </div>
          <Button size="sm" as={Link} to="/edit-company">
            Edit bio
          </Button>
        </div>
      </div>
    </CompanyBox>
  );
}
