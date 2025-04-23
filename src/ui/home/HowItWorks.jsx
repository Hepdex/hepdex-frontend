import styled, { css } from "styled-components";
import Section from "../../components/Section";
import Button from "../../components/button";
import { flex, mq } from "../../GlobalStyles";
import { Link } from "react-router-dom";

const Div = styled.div`
  background-color: var(--color-secondary);
  & > section {
    .steps {
      ${flex("center")}
      flex-direction: column;
      li.step {
        &.end {
          .icon {
            align-self: flex-start;
          }
        }
        .icon {
          ${flex("center", "center")}
          min-height: 100%;
          flex-direction: column;
          .circle {
            height: 56px;
            width: 56px;
            ${mq(
              "sm",
              css`
                height: 72px;
                width: 72px;
              `
            )}
            border: 1px solid var(--color-primary);
            border-radius: 50%;
            font-size: 32px;
            line-height: 40px;
            font-weight: 700;
            ${flex("center", "center")}
          }
          .arrow {
            width: 0px;
            border-right: 1px solid var(--color-primary);
            min-height: 70px;
          }
        }
        ${flex("center", "stretch")}
        column-gap: 16px;
        ${mq(
          "sm",
          css`
            column-gap: 56px;
          `
        )}
        .content {
          max-width: 500px;
          padding-bottom: 24px;
          ${mq(
            "sm",
            css`
              padding-bottom: 0px;
            `
          )}
          .step-title {
            font-size: 24px;
            line-height: 32px;
            margin-bottom: 8px;
          }
        }
      }
    }
    .btn-box {
      ${flex("center")}
      margin-top: 32px;
      ${mq(
        "sm",
        css`
          margin-top: 48px;
        `
      )}
    }
  }
`;

export default function HowItWorks() {
  return (
    <Div>
      <Section title="How it works" marginBottom={true}>
        <div data-aos className="custom-fade-up">
          <ul className="steps">
            <li className="step">
              <div className="icon">
                <div className="circle">1</div>
                <div className="arrow"></div>
              </div>
              <div className="content">
                <h3 className="step-title">Post a job for free</h3>
                <p className="text-md">
                  Complete in just 3-5 minutes, with full control over how our
                  experts connect with you.
                </p>
              </div>
            </li>
            <li className="step">
              <div className="icon">
                <div className="circle">2</div>
                <div className="arrow"></div>
              </div>
              <div className="content">
                <h3 className="step-title">Match with expert talent</h3>
                <p className="step-text">
                  Get matched with the ideal expert for your job in a few days.
                  On average, it takes less than 24 hours.
                </p>
              </div>
            </li>
            <li className="step end">
              <div className="icon">
                <div className="circle">3</div>
              </div>
              <div className="content">
                <h3 className="step-title">Get the right match</h3>
                <p className="step-text">
                  Work with your new team member on a trial basis and pay only
                  if you are satisfied, ensuring you hire the right person for
                  the job.
                </p>
              </div>
            </li>
          </ul>
          <div className="btn-box">
            <Button as={Link} to="/post-a-project" size="lg">
              Post your job
            </Button>
          </div>
        </div>
      </Section>
    </Div>
  );
}
