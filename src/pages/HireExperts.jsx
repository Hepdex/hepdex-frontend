import PageContent from "../components/PageContent";
import Section from "../components/Section";
import Container from "../components/Container";
import Button from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Badge from "../components/Badge";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { candidates } from "../data/candidates";
import {
  BsBriefcase,
  BsCheckCircleFill,
  BsGeoAlt,
  BsTools,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Modal from "../components/Modal";
import RoleNotify from "../components/RoleNotify";

const StyledHireExperts = styled.div`
  .expert {
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
    ${flex(undefined)}
    background-color: var(--color-grey-1);
    border-radius: 8px;
    flex-direction: column;
    padding: 24px;
    overflow: hidden;
    height: 100%;

    ${mq(
      "1000px",
      css`
        max-width: none;
        margin: 0;
      `
    )}

    p {
      color: var(--color-grey-2);
    }

    .top {
      .img-box {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 12px;
      }
      .title-status {
        ${flex(undefined, "center")}
        gap: 12px;
        margin-bottom: 8px;
        flex-wrap: wrap;

        h3 {
          font-size: 24px;
          line-height: 32px;
          font-weight: 500;
        }
      }
    }

    .meta {
      ${flex(undefined)}
      row-gap: 4px;
      flex-direction: column;
      margin-bottom: 8px;

      li {
        gap: 4px;
        ${flex(undefined, "center")}
      }
    }

    .bio-excerpt {
      margin-bottom: 20px;
    }
  }

  .experts.blurred {
    margin-top: 24px;
    position: relative;

    li:not(:first-child) {
      display: none;

      ${mq(
        "1000px",
        css`
          display: flex;
        `
      )}
    }

    li {
      pointer-events: none;
      .expert {
        & > * {
          filter: blur(8px);
        }
      }
    }

    .search-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      box-shadow: 0 7px 24px 0 #64646f33;
      background-color: var(--color-secondary);
      border-radius: 8px;
      width: calc(100% - 20px);
      max-width: 440px;
      padding: 40px;

      ${mq(
        "1000px",
        css`
          width: 100%;
          max-width: 70%;
        `
      )}

      p {
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
  }
`;

export default function HireExperts() {
  // Document title
  useDocumentTitle("Hire experts");

  // User context
  const { user, isLoggedIn } = useUserContext();
  return (
    <StyledHireExperts>
      <PageContent>
        <Section
          title="Hire Skilled Experts"
          subtitle="Access world-class talent for all your needs."
          spaceBottom
        >
          <Modal>
            <Container.Row className="custom-fade-up sm experts" data-aos>
              {candidates.map((candidate, index) => (
                <Container.Col
                  key={index}
                  breakPoints={[{ name: "1000px", cols: 3 }]}
                >
                  <div className="expert">
                    <div className="top">
                      <div className="img-box">
                        <img src={candidate.image} alt={candidate.name} />
                      </div>
                      <div className="title-status">
                        <h3>{candidate.name}</h3>

                        <Badge className="success">
                          <BsCheckCircleFill />
                          Available
                        </Badge>
                      </div>
                    </div>
                    <ul className="meta">
                      <li>
                        <BsGeoAlt />
                        <p>{candidate.location}</p>
                      </li>
                      <li>
                        <BsBriefcase />
                        <p>{candidate.jobTitle}</p>
                      </li>
                      <li>
                        <BsTools />
                        <p>{candidate.skills.join(", ")}</p>
                      </li>
                    </ul>

                    <p className="bio-excerpt">{candidate.bio}</p>
                    {user?.role === "candidate" ? (
                      <Modal.Open opens="role-notify">
                        <Button color="outline">See more</Button>
                      </Modal.Open>
                    ) : (
                      <Button
                        color="outline"
                        as={Link}
                        to={`${
                          user?.role === "employer" && isLoggedIn
                            ? "/dashboard/browse-talent"
                            : "/employer/signup"
                        }`}
                      >
                        See more
                      </Button>
                    )}
                  </div>
                </Container.Col>
              ))}
            </Container.Row>
            <Container.Row
              className="blurred experts custom-fade-up sm"
              data-aos
            >
              <Container.Col breakPoints={[{ name: "1000px", cols: 3 }]}>
                <div className="expert">
                  <div className="top">
                    <div className="img-box">
                      <img
                        src="https://randomuser.me/api/portraits/women/54.jpg"
                        alt="loading-image"
                      />
                    </div>
                    <div className="title-status">
                      <Link>
                        <h3>Loading name</h3>
                      </Link>
                      <Badge className="success">
                        <BsCheckCircleFill />
                        Available
                      </Badge>
                    </div>
                  </div>
                  <ul className="meta">
                    <li>
                      <BsGeoAlt />
                      <p>Loading location</p>
                    </li>
                    <li>
                      <BsBriefcase />
                      <p>Loading role</p>
                    </li>
                  </ul>
                  <p className="bio-excerpt">Loading bio</p>
                  <Button color="outline" as={Link}>
                    Contact
                  </Button>
                </div>
              </Container.Col>
              <Container.Col breakPoints={[{ name: "1000px", cols: 3 }]}>
                <div className="expert">
                  <div className="top">
                    <div className="img-box">
                      <img
                        src="https://randomuser.me/api/portraits/men/20.jpg"
                        alt="loading-image"
                      />
                    </div>
                    <div className="title-status">
                      <Link>
                        <h3>Loading name</h3>
                      </Link>
                      <Badge className="success">
                        <BsCheckCircleFill />
                        Available
                      </Badge>
                    </div>
                  </div>
                  <ul className="meta">
                    <li>
                      <BsGeoAlt />
                      <p>Loading location</p>
                    </li>
                    <li>
                      <BsBriefcase />
                      <p>Loading role</p>
                    </li>
                  </ul>

                  <p className="bio-excerpt">Loading bio</p>
                  <Button color="outline" as={Link}>
                    Contact
                  </Button>
                </div>
              </Container.Col>
              <Container.Col breakPoints={[{ name: "1000px", cols: 3 }]}>
                <div className="expert">
                  <div className="top">
                    <div className="img-box">
                      <img
                        src="https://randomuser.me/api/portraits/women/62.jpg"
                        alt="loading-image"
                      />
                    </div>
                    <div className="title-status">
                      <Link>
                        <h3>Loading name</h3>
                      </Link>
                      <Badge className="success">
                        <BsCheckCircleFill />
                        Available
                      </Badge>
                    </div>
                  </div>
                  <ul className="meta">
                    <li>
                      <BsGeoAlt />
                      <p>Loading location</p>
                    </li>
                    <li>
                      <BsBriefcase />
                      <p>Loading role</p>
                    </li>
                  </ul>

                  <p className="bio-excerpt">Loading bio</p>
                  <Button color="outline" as={Link}>
                    Contact
                  </Button>
                </div>
              </Container.Col>
              <div className="search-box">
                <p>
                  We have over 2000 skilled professionals with global experience
                  who've worked across many different industries and borders.
                </p>
                {user?.role === "candidate" ? (
                  <Modal.Open opens="role-notify">
                    <Button size="lg">Start search</Button>
                  </Modal.Open>
                ) : (
                  <Button
                    size="lg"
                    as={Link}
                    to={`${
                      user?.role === "employer" && isLoggedIn
                        ? "/dashboard/browse-talent"
                        : "/employer/signup"
                    }`}
                  >
                    Start search
                  </Button>
                )}
              </div>
            </Container.Row>
            <RoleNotify customEmployerTxt="search experts" />
          </Modal>
        </Section>
      </PageContent>
    </StyledHireExperts>
  );
}
