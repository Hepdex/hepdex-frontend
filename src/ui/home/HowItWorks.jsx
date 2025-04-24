import styled, { css } from "styled-components";
import Section from "../../components/Section";
import Button from "../../components/button";
import Step from "../../components/Step";
import { flex, mq } from "../../GlobalStyles";
import { Link } from "react-router-dom";

const Div = styled.div`
  background-color: var(--color-secondary);
  & > section {
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
            <Step
              number={1}
              title="Post a job for free"
              text="Complete in just 3-5 minutes, with full control over how our
                  experts connect with you."
            />
            <Step
              number={2}
              title="Match with expert talent"
              text="Get matched with the ideal expert for your job in a few days.
                  On average, it takes less than 24 hours."
            />
            <Step
              number={3}
              title="Get the right match"
              text="Work with your new team member on a trial basis and pay only
                  if you are satisfied, ensuring you hire the right person for
                  the job."
            />
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
