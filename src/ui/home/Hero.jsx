import Container from "../../components/Container";
import Button from "../../components/Button";
import bgImage from "../../assets/heroBg.jpg";
import styled, { css } from "styled-components";
import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { flex, mq } from "../../GlobalStyles";
import { useUserContext } from "../../context/UserContext";

// Hero container
const StyledHero = styled.div`
  position: relative;
  height: 620px;
  background-color: var(--color-tertiary);

  .hero {
    &-container {
      ${flex("center", "center")}
      min-height: 100%;

      &--inner {
        ${flex(undefined, "center")}
        column-gap: 64px;
        row-gap: 40px;
        flex-direction: column;
        padding: 132px 0px 40px 0px;

        // Hero content
        .hero-content {
          max-width: 450px;
          width: 100%;

          // Hero title
          &--title {
            margin-bottom: 24px;
          }

          // Features
          .features {
            ${flex()}
            width: 100%;
            margin-top: 8px;
            flex-direction: column;
            row-gap: 8px;

            &-item {
              ${flex(undefined, "start")}
              gap: 12px;
              padding: 4px 0px;

              p {
                line-height: 20px;
              }

              // Icon
              svg {
                min-width: 20px;
                fill: var(--color-primary-hover);
              }
            }
          }

          // Button group
          .btn-group {
            ${flex(undefined, "center")}
            flex-wrap: wrap;
            gap: 16px;
            margin-top: 32px;
          }

          // Large screens
          ${mq(
            "lg",
            css`
              max-width: 600px;
              width: 50%;
            `
          )}
        }

        // Hero image
        .hero-img {
          max-width: 420px;
          width: 80%;
          display: none;

          img {
            width: 100%;
            height: 100%;
          }

          // Small screens
          ${mq(
            "480px",
            css`
              display: block;
            `
          )}

          // Large screens
        ${mq(
            "lg",
            css`
              width: 50%;
            `
          )}
        }

        // Large screens
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
      }
    }
  }

  // Media queries
  ${mq(
    "400px",
    css`
      height: auto;
    `
  )}

  @media (min-width: 992px) and (min-height: 700px) and (max-height: 1000px) {
    height: 100dvh;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${bgImage});
  }
`;

export default function Hero() {
  // Deleting state
  const [deleting, setDeleting] = useState(false);

  // User context
  const { user, isLoggedIn } = useUserContext();

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
    <StyledHero className="hero">
      <div className="hero-container">
        <Container>
          <div className="hero-container--inner">
            {/* Hero content */}
            <div className="hero-content">
              <h1 className="heading-lg hero-content--title">
                Hire a remote <br /> {typeEffect}
                <Cursor cursorStyle="_" cursorBlinking={deleting} />
              </h1>
              <p className="text-md">
                Find over 20,000+ remote experts on HepDex.
              </p>
              {/* Features */}
              <ul className="features">
                <li className="features-item">
                  <BsCheckCircle size={20} />
                  <p className="text-md">Post your job for free</p>
                </li>
                <li className="features-item">
                  <BsCheckCircle size={20} />
                  <p className="text-md">Find skilled remote experts</p>
                </li>
                <li className="features-item">
                  <BsCheckCircle size={20} />
                  <p className="text-md">Join the 500+ companies using us</p>
                </li>
              </ul>
              {/* Button group */}
              <div className="btn-group">
                <Button
                  size="lg"
                  as={Link}
                  to={`${
                    user?.role === "employer" && isLoggedIn
                      ? "/post-a-job"
                      : "/login"
                  }`}
                >
                  Post a Job
                </Button>
                <Button color="outline" size="lg" as={Link} to="/find-work">
                  Find Work
                </Button>
              </div>
            </div>
            {/* Hero Image */}
            <div className="hero-img">
              <img alt="hero-image" src="heroImg.png" />
            </div>
          </div>
        </Container>
      </div>
    </StyledHero>
  );
}
