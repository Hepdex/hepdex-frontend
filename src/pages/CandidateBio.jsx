import styled, { css } from "styled-components";
import DashboardTitle from "../components/DashboardTitle";
import DashboardBox from "../components/DashboardBox";
import DetailsBox from "../components/DetailsBox";
import IconTitle from "../components/IconTitle";
import Badge from "../components/Badge";
import AvatarImage from "../components/AvatarImage";
import Button from "../components/Button";
import { BsPerson } from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { capitalizeFirst } from "../utils/helpers";
import { flex, mq } from "../GlobalStyles";
import ViewResume from "../components/ViewResume";
import { getResume } from "../services/apiResume";
import useMutate from "../hooks/useMutate";

const StyledCandidateBio = styled.div`
  // Profile
  .profile {
    padding-left: 20px;
    ${mq(
      "sm",
      css`
        padding-left: 40px;
      `
    )}

    &-top {
      ${flex("space-between", "center")}
      gap: 24px;
      flex-wrap: wrap;
      margin-bottom: 16px;

      &--left {
        ${flex(undefined, "center")}
        gap: 16px;

        .candidate {
          &-name {
            font-weight: 500;
            font-size: 22px;
            line-height: 28px;
          }
          &-role {
            color: var(--color-grey-2);
          }
        }
      }
    }

    &-details {
      ${flex("center")}
      flex-direction: column;
      gap: 24px;

      ul {
        padding: 0;
      }

      p {
        color: var(--color-grey-2);
      }

      &--box {
        h3 {
          font-size: 18px;
          line-height: 24px;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .badge-list {
          ${flex(undefined, "center")}
          gap: 12px;
          flex-wrap: wrap;
        }

        .resume-ctas {
          ${flex(undefined, "center")}
          gap: 16px;
          flex-wrap: wrap;
        }
      }
    }
  }
`;

export default function CandidateBio() {
  // User context
  const { user } = useUserContext();

  // Get resume
  const [fetchResume, loading] = useMutate(getResume);

  return (
    <StyledCandidateBio>
      <DashboardTitle
        title="Profile"
        subtitle="Manage profile information"
        links={[{ name: "Profile" }]}
      />

      <DetailsBox>
        <DashboardBox className="details-box--content">
          <IconTitle
            title="Candidate profile"
            icon={<BsPerson size={18} />}
            className="title"
          />
          <div className="profile">
            <div className="profile-top">
              <div className="profile-top--left">
                <AvatarImage>
                  <span className="no-image">
                    {`${user.firstName.at(0)}${user.lastName.at(0)}`}
                  </span>
                </AvatarImage>
                <div className="candidate">
                  <h2 className="candidate-name">{`${capitalizeFirst(
                    user.firstName
                  )} ${capitalizeFirst(user.lastName)}`}</h2>
                  <p className="candidate-role">
                    {capitalizeFirst(user.jobTitle)}
                  </p>
                </div>
              </div>
              <div className="profile-top--right">
                <Button size="sm" as={Link} to="/edit-profile">
                  Edit profile
                </Button>
              </div>
            </div>
            <div className="profile-details">
              <div className="profile-details--box">
                <h3>About</h3>
                <p>{user.bio.about}</p>
              </div>
              <div className="profile-details--box">
                <ul>
                  <li>
                    <span className="name">Email</span>
                    <span className="value">{user.email}</span>
                  </li>
                  <li>
                    <span className="name">Country</span>
                    <span className="value">
                      {capitalizeFirst(user.country)}
                    </span>
                  </li>
                  <li>
                    <span className="name">Job type</span>
                    <span className="value">
                      {capitalizeFirst(user.jobType)}
                    </span>
                  </li>
                </ul>
              </div>
              {user?.bio.skills && (
                <div className="profile-details--box">
                  <h3>Skills</h3>
                  <div className="badge-list">
                    {user.bio.skills.map((skill, index) => (
                      <Badge className="neutral" key={index}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {user?.bio.languages && (
                <div className="profile-details--box">
                  <h3>Languages</h3>
                  <div className="badge-list">
                    {user.bio.languages.map((skill, index) => (
                      <Badge className="neutral" key={index}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="profile-details--box">
                <h3>Resume</h3>
                <div className="resume-ctas">
                  <ViewResume
                    size="sm"
                    text="View resume"
                    color="secondary"
                    loading={loading}
                    resumePath={user.resumePath}
                    fetchResume={fetchResume}
                  />
                  <Button size="sm" as={Link} to="/upload-resume">
                    Upload resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DashboardBox>
      </DetailsBox>
    </StyledCandidateBio>
  );
}
