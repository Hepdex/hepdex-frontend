import Steps from "../../components/Steps";
import Section from "../../components/Section";
import Button from "../../components/Button";
import styled, { css } from "styled-components";
import { flex, mq } from "../../GlobalStyles";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

// Box
const StyledHowItWorks = styled.div`
  background-color: var(--color-secondary);

  .btn-box {
    ${flex("center")}
    margin-top: 32px;

    // Small screens
    ${mq(
      "sm",
      css`
        margin-top: 48px;
      `
    )}
  }
`;

export default function HowItWorks() {
  // User context
  const { user, isLoggedIn } = useUserContext();

  return (
    <StyledHowItWorks>
      <Section title="How it works" spaceBottom={true}>
        <div data-aos className="custom-fade-up">
          <Steps>
            <Steps.Step
              number={1}
              title="Post a job for free"
              text="Complete in just 3-5 minutes, with full control over how our
                  experts connect with you."
            />
            <Steps.Step
              number={2}
              title="Match with expert talent"
              text="Get matched with the ideal expert for your job in a few days.
                  On average, it takes less than 24 hours."
            />
            <Steps.Step
              number={3}
              title="Get the right match"
              text="Work with your new team member on a trial basis and pay only
                  if you are satisfied, ensuring you hire the right person for
                  the job."
            />
          </Steps>
          <div className="btn-box">
            <Button
              as={Link}
              to={`${
                user?.role === "employer" && isLoggedIn
                  ? "/post-a-job"
                  : "/login"
              }`}
              size="lg"
            >
              Post your job
            </Button>
          </div>
        </div>
      </Section>
    </StyledHowItWorks>
  );
}
