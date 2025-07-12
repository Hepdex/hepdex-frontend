import Container from "./Container";
import Logo from "./Logo";
import styled, { css } from "styled-components";
import { useUserContext } from "../context/UserContext";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { flex, mq } from "../GlobalStyles";

// Footer container
const StyledFooter = styled.footer`
  padding-top: 72px;
  background-color: var(--color-black-1);
  color: var(--color-white-2);

  ${mq(
    "lg",
    css`
      padding-top: 96px;
    `
  )}

  // Links & Buttons
    a, button {
    transition: all.3s ease-in-out;
    &:hover {
      color: var(--color-white-1);
    }
  }

  button {
    background-color: transparent;
  }

  .footer {
    /* ====================
     Top Section 
    ===================== */
    &--top {
      padding-bottom: 48px;
      border-bottom: 1px solid #e5e5e51a;

      ${mq(
        "lg",
        css`
          padding-bottom: 64px;
        `
      )}

      // Footer row
      &__row {
        row-gap: 32px;

        // Footer column
        .footer--col {
          &__title {
            font-size: 20px;
            font-weight: 500;
            line-height: 32px;
            margin-bottom: 16px;
            color: var(--color-white-1);
          }

          ul {
            ${flex()}
            flex-direction: column;
            row-gap: 12px;
          }

          // About column
          &about {
            .logo {
              display: inline-block;
              margin-bottom: 16px;
            }
          }
        }
      }
    }

    /* ====================
     Bottom Section 
    ===================== */
    &--bottom {
      ${flex("space-between", "center")}
      padding: 24px 0px;
      flex-wrap: wrap;
      gap: 18px;

      &__social {
        ${flex(undefined, "center")}
        column-gap: 12px;
      }
    }
  }
`;

export default function Footer() {
  // User context
  const { user, isLoggedIn } = useUserContext();

  // Navigate hook
  const navigate = useNavigate();

  // Handle browse experts
  const handleBrowseExperts = (jobTitle) => {
    // Check user role and if user is logged in

    if (user?.role === "employer" && isLoggedIn) {
      // Search jobTitle
      navigate(`/dashboard/browse-talent?jobTitle=${jobTitle}`);
    } else {
      // Navigate to login
      navigate("/hire-expert");
    }
  };

  // Handle find work
  const handleFindWork = (jobTitle) => {
    navigate(`/find-work?jobTitle=${jobTitle}`);
  };
  return (
    <StyledFooter className="footer">
      <Container>
        <div className="footer--top">
          <Container.Row className="footer--top__row">
            <Container.Col
              breakPoints={[
                { name: "sm", cols: 2 },
                { name: "lg", cols: 4 },
              ]}
            >
              <div className="footer--col" id="about">
                <Logo alt={true} />
                <p className="footer--about">
                  We connect companies with a handpicked network of experts.
                </p>
              </div>
            </Container.Col>
            <Container.Col
              breakPoints={[
                { name: "sm", cols: 2 },
                { name: "lg", cols: 4 },
              ]}
            >
              <div className="footer--col">
                <h3 className="footer--col__title">Hire Experts</h3>
                <ul>
                  <li>
                    <button
                      onClick={() =>
                        handleBrowseExperts("Data entry specialist")
                      }
                    >
                      Data Entry Experts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleBrowseExperts("Virtual assistant")}
                    >
                      Virtual Assistants
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleBrowseExperts("Help desk support")}
                    >
                      Help Desk Experts
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleBrowseExperts("Content writers")}
                    >
                      Content Writers
                    </button>
                  </li>
                </ul>
              </div>
            </Container.Col>
            <Container.Col
              breakPoints={[
                { name: "sm", cols: 2 },
                { name: "lg", cols: 4 },
              ]}
            >
              <div className="footer--col">
                <h3 className="footer--col__title">Find Work</h3>
                <ul>
                  <li>
                    <button onClick={() => handleFindWork("Virtual assistant")}>
                      Find Virtual Assistant Jobs
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleFindWork("Developer")}>
                      Find Developer Jobs
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleFindWork("Help desk support")}>
                      Find Help Desk Jobs
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleFindWork("Digital marketer")}>
                      Find Marketing Jobs
                    </button>
                  </li>
                </ul>
              </div>
            </Container.Col>
            <Container.Col
              breakPoints={[
                { name: "sm", cols: 2 },
                { name: "lg", cols: 4 },
              ]}
            >
              <div className="footer--col">
                <h3 className="footer--col__title">Support</h3>
                <ul>
                  <li>
                    <Link to="/about-us">About us</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact us</Link>
                  </li>
                  <li>
                    <Link to="/faqs">FAQs</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-and-conditions">Terms and Conditions</Link>
                  </li>
                </ul>
              </div>
            </Container.Col>
          </Container.Row>
        </div>
        <div className="footer--bottom">
          <div className="footer--bottom__copyright">
            © Hepdex 2025, All rights reserved.
          </div>
          <ul className="footer--bottom__social">
            <li>
              <Link to="https://www.facebook.com" target="_blank">
                <FaFacebookF size={24} />
              </Link>
            </li>
            <li>
              <Link to="https://www.twitter.com" target="_blank">
                <FaXTwitter size={24} />
              </Link>
            </li>
            <li>
              <Link to="https://www.instagram.com" target="_blank">
                <FaInstagram size={24} />
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com" target="_blank">
                <FaLinkedinIn size={24} />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </StyledFooter>
  );
}
