import styled, { css } from "styled-components";
import DashboardTitle from "../components/DashboardTitle";
import DashboardBox from "../components/DashboardBox";
import DetailsBox from "../components/DetailsBox";
import IconTitle from "../components/IconTitle";
import Badge from "../components/Badge";
import AvatarImage from "../components/AvatarImage";
import Button from "../components/Button";
import ViewResume from "../components/ViewResume";
import useMutate from "../hooks/useMutate";
import useDocumentTitle from "../hooks/useDocumentTitle";
import {
  BsCheckCircleFill,
  BsPencil,
  BsPerson,
  BsXCircleFill,
} from "react-icons/bs";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { capitalizeFirst } from "../utils/helpers";
import { flex, mq } from "../GlobalStyles";
import { getResume } from "../services/apiResume";
import ProtectedRoute from "../components/ProtectedRoute";

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
      ${flex("space-between", "start")}
      position: relative;
      gap: 24px;
      row-gap: 16px;
      margin-bottom: 24px;

      &--left {
        ${flex(undefined, "start")}
        gap: 16px;
        flex-direction: column;

        ${mq(
          "sm",
          css`
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
          `
        )}

        .candidate {
          &-name {
            font-weight: 500;
            font-size: 24px;
            line-height: 28px;
          }
          &-details {
            gap: 8px;
            row-gap: 2px;
            ${flex(undefined, "center")}
            flex-wrap: wrap;
            color: var(--color-grey-2);
            margin-bottom: 8px;

            p {
              ${flex(undefined, "center")}
              gap: 4px;

              &:not(:first-child)::before {
                content: "";
                width: 4px;
                height: 4px;
                background-color: var(--color-grey-2);
                border-radius: 50%;
              }
            }
          }
        }
      }

      &--right {
        position: absolute;
        top: 0;
        right: 0;

        ${mq(
          "sm",
          css`
            position: static;
          `
        )}

        .edit-profile {
          ${flex("center", "center")}
          width: 48px;
          height: 48px;
          border-radius: 50%;
          transition: background-color 0.4s ease-in-out;

          &:hover {
            background-color: #f3f4f6;
          }
        }
      }
    }

    &-details {
      ${flex("center")}
      flex-direction: column;
      gap: 24px;

      p {
        color: var(--color-grey-2);
      }

      &--box {
        h3 {
          font-size: 18px;
          line-height: 24px;
          font-weight: 500;
          margin-bottom: 4px;
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
  // Document title
  useDocumentTitle("Profile");

  // User context
  const { user } = useUserContext();

  // Get resume
  const [fetchResume, loading] = useMutate(getResume);

  return (
    <ProtectedRoute allowedRoles={["candidate"]}>
      <StyledCandidateBio>
        <DashboardTitle
          title="Profile"
          subtitle="Manage profile information"
          links={[{ name: "Profile" }]}
        />
        <DetailsBox>
          <DashboardBox className="details-box--content">
            <IconTitle
              title="Profile"
              icon={<BsPerson size={18} />}
              className="title"
            />
            <div className="profile">
              <div className="profile-top">
                <div className="profile-top--left">
                  <AvatarImage size={96}>
                    {user.profileImage ? (
                      <img alt="profile-image" src={user.profileImage} />
                    ) : (
                      <div className="no-image">
                        {`${user.firstName.at(0)}${user.lastName.at(0)}`}
                      </div>
                    )}
                  </AvatarImage>
                  <div className="candidate">
                    <h2 className="candidate-name">{`${capitalizeFirst(
                      user.firstName
                    )} ${capitalizeFirst(user.lastName)}`}</h2>
                    <div className="candidate-details">
                      <p> {capitalizeFirst(user.jobTitle)}</p>
                      <p>{capitalizeFirst(user.jobType)}</p>
                    </div>
                    {user.available ? (
                      <Badge className="success">
                        <BsCheckCircleFill />
                        Available
                      </Badge>
                    ) : (
                      <Badge className="dark">
                        <BsXCircleFill />
                        Not available
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="profile-top--right">
                  <Link to="/edit-profile" className="edit-profile">
                    <BsPencil size={24} />
                  </Link>
                </div>
              </div>
              <div className="profile-details">
                <div className="profile-details--box">
                  <h3>Biography</h3>
                  <p>{user?.bio?.about ?? "No bio has been added."}</p>
                </div>
                <div className="profile-details--box">
                  <h3>Email address</h3>
                  <p>{user.email}</p>
                </div>
                <div className="profile-details--box">
                  <h3>Location</h3>
                  <p>{capitalizeFirst(user.country)}</p>
                </div>
                <div className="profile-details--box">
                  <h3>Skills</h3>
                  {user?.bio?.skills?.length > 0 ? (
                    <div className="badge-list">
                      {user.bio.skills.map((skill, index) => (
                        <Badge className="neutral" key={index}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p>No skills have been added.</p>
                  )}
                </div>
                <div className="profile-details--box">
                  <h3>Languages</h3>
                  {user?.bio?.languages?.length > 0 ? (
                    <div className="badge-list">
                      {user.bio.languages.map((skill, index) => (
                        <Badge className="neutral" key={index}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p>No languages have been added.</p>
                  )}
                </div>
                <div className="profile-details--box">
                  <h3>Resume</h3>
                  <div className="resume-ctas">
                    <ViewResume
                      size="sm"
                      text="View resume"
                      color="secondary"
                      className="alternate"
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
    </ProtectedRoute>
  );
}
