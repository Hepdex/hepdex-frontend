import Container from "./Container";
import Logo from "./Logo";
import styled, { css } from "styled-components";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
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

  // Links
    a {
    transition: all.3s ease-in-out;
    &:hover {
      color: var(--color-white-1);
    }
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
                    <Link>Data Entry Experts</Link>
                  </li>
                  <li>
                    <Link>Virtual Assistants</Link>
                  </li>
                  <li>
                    <Link>Help Desk Experts</Link>
                  </li>
                  <li>
                    <Link>Content Writers</Link>
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
                    <Link>Find Virtual Assistant Jobs</Link>
                  </li>
                  <li>
                    <Link>Find Developer Jobs</Link>
                  </li>
                  <li>
                    <Link>Find Help Desk Jobs</Link>
                  </li>
                  <li>
                    <Link>Find Marketing Jobs</Link>
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
                    <Link>Help</Link>
                  </li>
                  <li>
                    <Link>Customer Support</Link>
                  </li>
                  <li>
                    <Link>Terms and Conditions</Link>
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
              <Link>
                <FaFacebookF size={24} />
              </Link>
            </li>
            <li>
              <Link>
                <FaXTwitter size={24} />
              </Link>
            </li>
            <li>
              <Link>
                <FaInstagram size={24} />
              </Link>
            </li>
            <li>
              <Link>
                <FaLinkedinIn size={24} />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </StyledFooter>
  );
}
