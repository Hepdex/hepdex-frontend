import Container from "./Container";
import styled from "styled-components";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { flex } from "../GlobalStyles";

const FooterDiv = styled.footer`
  &.footer {
    a {
      transition: all.3s ease-in-out;
      &:hover {
        color: var(--color-white-1);
      }
    }
    padding-top: 96px;
    background-color: var(--color-black-1);
    color: var(--color-white-2);
    .top {
      padding-bottom: 64px;
      border-bottom: 1px solid #e5e5e51a;
      #about {
        .logo {
          display: inline-block;
          margin-bottom: 16px;
        }
      }
      .footer-col {
        .column-title {
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
      }
    }
    .bottom {
      ${flex("space-between", "center")}
      padding: 24px;
      .social-media {
        ${flex(undefined, "center")}
        column-gap: 12px;
      }
    }
  }
`;
export default function Footer() {
  return (
    <FooterDiv className="footer">
      <Container>
        <div className="top">
          <Container.Row>
            <Container.Col breakPoints={[{ name: "md", cols: 4 }]}>
              <div className="footer-col" id="about">
                <Link className="logo">
                  <img src="./hepdex-white.svg" alt="footer-logo" />
                </Link>
                <p className="about">
                  We connect companies with a handpicked network of experts.
                </p>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 4 }]}>
              <div className="footer-col">
                <h3 className="column-title">Hire Experts</h3>
                <ul>
                  <li>
                    <Link>Post a Project</Link>
                  </li>
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
                  <li>
                    <Link>See More Services</Link>
                  </li>
                </ul>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 4 }]}>
              <div className="footer-col">
                <h3 className="column-title">Find Work</h3>
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
                  <li>
                    <Link>See All Available Jobs</Link>
                  </li>
                </ul>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 4 }]}>
              <div className="footer-col">
                <h3 className="column-title">Support</h3>
                <ul>
                  <li>
                    <Link>FAQs</Link>
                  </li>
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
        <div className="bottom">
          <div className="copyright">© Hepdex 2025, All rights reserved.</div>
          <ul className="social-media">
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
                <FaFacebookF size={24} />
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
    </FooterDiv>
  );
}
