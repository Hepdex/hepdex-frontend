import Steps from "../../components/Steps";
import Container from "../../components/Container";
import styled, { css } from "styled-components";
import { flex, mq } from "../../GlobalStyles";

// StepsBox
const StepsBox = styled.div`
  ${flex("center", "center")}
  background-color: var(--color-secondary);
  border-radius: 8px;
  padding: 32px 16px;
  height: 100%;

  ul li {
    align-self: flex-start;
  }

  // Small screens
  ${mq(
    "sm",
    css`
      padding: 48px 24px;
    `
  )}
`;

export default function RequirementSteps() {
  return (
    <Container.Col breakPoints={[{ name: "850px", width: 50 }]}>
      <StepsBox>
        <Steps>
          <Steps.Step
            title="Tell us what you need"
            text="Share your hiring needs to help us screen the top 2% candidates from our talent network."
            number={1}
          />
          <Steps.Step
            title="Interview our Talent"
            text="We'll connect you with hand picked, pre screened candidates perfectly aligned with your requirements."
            number={2}
          />
          <Steps.Step
            title="Onboard your Hire"
            text="Welcome your new remote hire to the team, while we've got everything else covered."
            number={3}
          />
        </Steps>
      </StepsBox>
    </Container.Col>
  );
}
