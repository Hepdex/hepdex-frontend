import Container from "../../components/Container";
import Button from "../../components/Button";
import styled, { css } from "styled-components";
import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { flex, mq } from "../../GlobalStyles";

// Hero box
const HeroBox = styled.div`
  position: relative;
  height: 620px;
  background-color: var(--color-tertiary);
  ${mq(
    "400px",
    css`
      height: auto;
    `
  )}
  ${mq(
    "lg",
    css`
      @media (min-height: 700px) and (max-height: 1000px) {
        height: 100dvh;
        background-image: url("heroBg.jpg");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
      }
    `
  )}
  // Content
  .content {
    min-height: 100%;
    ${flex("center", "center")}
    .inner {
      ${flex(undefined, "center")}
      flex-direction: column;
      padding: 132px 0px 40px 0px;

      ${mq(
        "lg",
        css`
          flex-direction: row;
          @media (min-height: 700px) and (max-height: 1000px) {
            padding-top: 50px;
            padding-bottom: 0px;
          }
        `
      )}
      column-gap: 64px;
      row-gap: 40px;
      .hero-content {
        max-width: 450px;
        width: 100%;
        ${mq(
          "lg",
          css`
            max-width: 600px;
            width: 50%;
          `
        )}
        h1 {
          margin-bottom: 24px;
        }
        .info-list {
          width: 100%;
          margin-top: 8px;
          ${flex()}
          flex-direction: column;
          row-gap: 8px;

          li {
            svg {
              min-width: 20px;
              fill: var(--color-primary-hover);
            }
            ${flex(undefined, "start")}
            gap: 12px;
            padding: 4px 0px;
            p {
              line-height: 20px;
            }
          }
        }
        .btn-group {
          ${flex(undefined, "center")}
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 32px;
        }
      }
      .hero-img {
        max-width: 420px;
        width: 80%;
        display: none;
        ${mq(
          "480px",
          css`
            display: block;
          `
        )}
        ${mq(
          "lg",
          css`
            width: 50%;
          `
        )}
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;

export default function Hero() {
  // Deleting state
  const [deleting, setDeleting] = useState(false);
  // Type effect
  const [typeEffect] = useTypewriter({
    words: ["virtual assistant", "developer", "designer", "digital marketer"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
    onType: () => setDeleting(false),
    onDelete: () => setDeleting(true),
  });
  return (
    <HeroBox>
      <div className="content">
        <Container>
          <div className="inner">
            <div className="hero-content">
              <h1 className="heading-lg">
                Hire a remote <br /> {typeEffect}
                <Cursor cursorStyle="_" cursorBlinking={deleting} />
              </h1>
              <p className="text-md">
                Find over 20,000+ remote experts on HepDex.
              </p>
              <ul className="info-list">
                <li className="info-item">
                  <BsCheckCircle size={20} />
                  <p className="text-md">Post your job for free</p>
                </li>
                <li className="info-item">
                  <BsCheckCircle size={20} />
                  <p className="text-md">Find skilled remote experts</p>
                </li>
                <li className="info-item">
                  <BsCheckCircle size={20} />
                  <p className="text-md">Join the 20,000+ companies using us</p>
                </li>
              </ul>
              <div className="btn-group">
                <Button size="lg" as={Link} to="/post-a-project">
                  Post a Job
                </Button>
                <Button color="outline" size="lg" as={Link} to="/find-work">
                  Find Work
                </Button>
              </div>
            </div>
            <div className="hero-img">
              <img alt="hero-image" src="heroImg.png" />
            </div>
          </div>
        </Container>
      </div>
    </HeroBox>
  );
}
