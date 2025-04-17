import Container from "./Container";
import Button from "./button";
import Header from "./Header";
import styled, { css } from "styled-components";
import { flex, mq } from "../GlobalStyles";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { useState } from "react";

const Div = styled.div`
  position: relative;
  height: 600px;
  ${mq(
    "lg",
    css`
      height: 100vh;
    `
  )}
  background-image: url('heroBg.jpg');
  background-position: top right;
  background-repeat: no-repeat;
  background-size: cover;
  // Content
  .content {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .inner {
      ${flex("space-between", "center")}
      .hero-content {
        max-width: 600px;
        width: 100%;
        h1 {
          font-size: 72px;
          line-height: 70px;
          margin-bottom: 24px;
        }
        .btn-group {
          ${flex(undefined, "center")}
          gap: 16px;
          margin-top: 32px;
        }
      }
    }
  }
`;

export default function Hero() {
  const [deleting, setDeleting] = useState(false);
  const [typeEffect] = useTypewriter({
    words: ["virtual assistant", "developer", "designer", "digital marketer"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
    onType: () => setDeleting(false),
    onDelete: () => setDeleting(true),
  });
  return (
    <Div>
      <Header />
      <div className="content">
        <Container>
          <div className="inner">
            <div className="hero-content">
              <h1>
                Hire an expert <br /> {typeEffect}
                <Cursor cursorStyle="_" cursorBlinking={deleting} />
              </h1>
              <p className="text-md">
                Go global without the hassle. From hiring to payroll, we manage
                your international teams so you can turn big ideas into global
                wins.
              </p>
              <div className="btn-group">
                <Button size="lg" as={Link} to="/post-a-project">
                  Post a project
                </Button>
                <Button color="outline" size="lg" as={Link} to="/find-work">
                  Find work
                </Button>
              </div>
            </div>
            <div className="hero-img">
              <img alt="hero-image" src="heroImg.png" />
            </div>
          </div>
        </Container>
      </div>
    </Div>
  );
}
