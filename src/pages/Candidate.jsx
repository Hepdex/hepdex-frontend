import AvatarImage from "../components/AvatarImage";
import Badge from "../components/Badge";
import ContentLoader from "../components/ContentLoader";
import DashboardBox from "../components/DashboardBox";
import DashboardTitle from "../components/DashboardTitle";
import DetailsBox from "../components/DetailsBox";
import IconTitle from "../components/IconTitle";
import useMutate from "../hooks/useMutate";
import useQuery from "../hooks/useQuery";
import ViewResume from "../components/ViewResume";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { flex, mq } from "../GlobalStyles";
import { getCandidate } from "../services/apiCandidate";
import { getResume } from "../services/apiResume";
import { capitalizeFirst } from "../utils/helpers";

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
      }
    }
  }
`;

export default function Candidate() {
  // Get Candidate id
  const { id } = useParams();

  // Get candidate
  const [data, pending] = useQuery(getCandidate, `?userID=${id}`);

  const candidate = data?.candidate;

  // Get resume
  const [fetchResume, loading] = useMutate(getResume);

  return (
    <StyledCandidateBio>
      <DashboardTitle
        title="Candidate"
        subtitle="View candidate information"
        links={[
          { name: "Sourcing", url: "/dashboard/browse-talent" },
          { name: "Candidate" },
        ]}
      />

      {pending ? (
        <ContentLoader />
      ) : (
        <>
          {candidate && (
            <DetailsBox>
              <DashboardBox className="details-box--content">
                <IconTitle
                  title="Candidate details"
                  icon={<BsPerson size={18} />}
                  className="title"
                />
                <div className="profile">
                  <div className="profile-top">
                    <div className="profile-top--left">
                      <AvatarImage>
                        <span className="no-image">
                          {`${candidate.firstName.at(0)}${candidate.lastName.at(
                            0
                          )}`}
                        </span>
                      </AvatarImage>
                      <div className="candidate">
                        <h2 className="candidate-name">{`${capitalizeFirst(
                          candidate.firstName
                        )} ${capitalizeFirst(candidate.lastName)}`}</h2>
                        <p className="candidate-role">
                          {capitalizeFirst(candidate.jobTitle)}
                        </p>
                      </div>
                    </div>
                    <div className="profile-top--right">
                      <ViewResume
                        size="sm"
                        text="View resume"
                        loading={loading}
                        resumePath={candidate.resumePath}
                        fetchResume={fetchResume}
                      />
                    </div>
                  </div>
                  <div className="profile-details">
                    <div className="profile-details--box">
                      <h3>About</h3>
                      <p>
                        {candidate?.bio?.about ??
                          "No bio available for this candidate."}
                      </p>
                    </div>

                    <div className="profile-details--box">
                      <ul>
                        <li>
                          <span className="name">Email</span>
                          <span className="value">{candidate.email}</span>
                        </li>
                        <li>
                          <span className="name">Country</span>
                          <span className="value">
                            {capitalizeFirst(candidate.country)}
                          </span>
                        </li>
                        <li>
                          <span className="name">Job type</span>
                          <span className="value">
                            {capitalizeFirst(candidate.jobType)}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="profile-details--box">
                      <h3>Skills</h3>
                      {candidate?.bio?.skills?.length > 0 ? (
                        <div className="badge-list">
                          {candidate.bio.skills.map((skill, index) => (
                            <Badge className="neutral" key={index}>
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p>No skills have been added for this candidate.</p>
                      )}
                    </div>
                    <div className="profile-details--box">
                      <h3>Languages</h3>
                      {candidate?.bio?.languages?.length > 0 ? (
                        <div className="badge-list">
                          {candidate.bio.languages.map((skill, index) => (
                            <Badge className="neutral" key={index}>
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p>No languages have been added for this candidate.</p>
                      )}
                    </div>
                  </div>
                </div>
              </DashboardBox>
            </DetailsBox>
          )}
        </>
      )}
    </StyledCandidateBio>
  );
}
