import styled, { css } from "styled-components";
import Overlay from "./Overlay";
import Badge from "./Badge";
import Button from "./Button";
import AvatarImage from "./AvatarImage";
import useMutate from "../hooks/useMutate";
import { createPortal } from "react-dom";
import { BsCheckCircleFill, BsEnvelope, BsGeoAlt, BsXLg } from "react-icons/bs";
import { flex, mq } from "../GlobalStyles";
import { capitalizeFirst } from "../utils/helpers";
import { getResume } from "../services/apiResume";
import ViewResume from "./ViewResume";

const StyledCandidateModal = styled.div`
  .modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
    border-radius: 8px;
    width: calc(100% - 32px);
    max-height: calc(100vh - 64px);
    max-width: 650px;
    overflow-y: auto;
    background-color: var(--color-white-1);
  }

  .modal-header {
    position: relative;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }

  .close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    padding: 8px;
    border: none;
    background: none;
    cursor: pointer;

    svg {
      fill: #757575;
    }
  }

  .user-info {
    gap: 16px;
    flex-direction: column;
    ${flex("center")}

    ${mq(
      "450px",
      css`
        flex-direction: row;
        justify-content: start;
        align-items: center;
      `
    )}

    .no-image {
      font-size: 28px;
      line-height: 32px;
    }
  }

  .user-details {
    flex: 1;
  }

  .user-name {
    font-size: 24px;
    line-height: 28px;
    font-weight: 500;
    margin: 0 0 4px 0;
  }

  .contact-info {
    ${flex(undefined, "center")}
    flex-wrap: wrap;
    margin-top: 8px;
    gap: 16px;
    row-gap: 4px;
    color: var(--color-grey-2);
    font-size: 16px;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .modal-content {
    ${flex(undefined)}
    padding: 16px;
    flex-direction: column;
    gap: 16px;
  }

  .section {
    ${flex(undefined)}
    flex-direction: column;

    p {
      color: var(--color-grey-2);
    }
  }

  .section-title {
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 8px 0;
  }

  .bio {
    color: var(--color-grey-2);
  }

  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .languages-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .resume-section {
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;

    button {
      width: 100%;
    }
  }
`;

export default function CandidateModal({ candidate, close }) {
  // Get resume
  const [fetchResume, loading] = useMutate(getResume);

  return createPortal(
    <StyledCandidateModal>
      <Overlay onClick={close} />
      <div className="modal-container">
        <div className="modal-header">
          <button onClick={close} className="close-button">
            <BsXLg size={16} />
          </button>
          <div className="user-info">
            <AvatarImage size={96}>
              {candidate.profileImage ? (
                <img alt="profile-image" src={candidate.profileImage} />
              ) : (
                <div className="no-image">
                  {`${candidate.firstName.at(0)}${candidate.lastName.at(0)}`}
                </div>
              )}
            </AvatarImage>
            <div className="user-details">
              <h2 className="user-name">
                {capitalizeFirst(candidate.firstName)}{" "}
                {capitalizeFirst(candidate.lastName)}
              </h2>
              <Badge className="success">
                <BsCheckCircleFill />
                Available
              </Badge>
              <div className="contact-info">
                <div className="contact-item">
                  <BsEnvelope size={16} />
                  <span>{candidate.email}</span>
                </div>
                <div className="contact-item">
                  <BsGeoAlt size={16} />
                  <span>{capitalizeFirst(candidate.country)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-content">
          <div className="section">
            <h3 className="section-title">About</h3>
            <p className="bio">
              {candidate?.bio?.about ?? "No bio has been added."}
            </p>
          </div>
          <div className="section">
            <h3 className="section-title">Skills</h3>
            <div className="skills-container">
              {candidate?.bio?.skills?.length > 0 ? (
                <>
                  {candidate?.bio?.skills.map((skill, index) => (
                    <Badge key={index} className="neutral">
                      {skill}
                    </Badge>
                  ))}
                </>
              ) : (
                <p>No skills have been added.</p>
              )}
            </div>
          </div>
          <div className="section">
            <h3 className="section-title">Languages</h3>
            <div className="languages-list">
              {candidate?.bio?.languages?.length > 0 ? (
                <>
                  {candidate.bio.languages.map((skill, index) => (
                    <Badge className="neutral" key={index}>
                      {skill}
                    </Badge>
                  ))}
                </>
              ) : (
                <p>No languages have been added.</p>
              )}
            </div>
          </div>
          <div className="resume-section">
            <ViewResume
              size="md"
              text="View resume"
              color="primary"
              loading={loading}
              resumePath={candidate.resumePath}
              fetchResume={fetchResume}
            />
          </div>
        </div>
      </div>
    </StyledCandidateModal>,
    document.body
  );
}
