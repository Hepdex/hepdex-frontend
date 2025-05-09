import styled, { css } from "styled-components";
import Button from "../components/Button";
import Container from "../components/Container";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  Select,
  Textarea,
} from "../components/Form";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import Step from "../components/Step";
import { mq } from "../GlobalStyles";
import useDocumentTitle from "../utils/TitleUpdater";

const Div = styled.div`
  .steps-box {
    background-color: var(--color-secondary);
    border-radius: 16px;
    padding: 32px 16px;
    ul li {
      align-self: flex-start;
    }
    ${mq(
      "sm",
      css`
        padding: 48px 24px;
      `
    )}
  }
  .requirement-box {
    .cta {
      margin-top: 6px;
    }
  }
`;

export default function Requirements() {

  useDocumentTitle("Hepdex - share requirement");
  return (
    <PageContent>
      <Section
        title="It's Super Easy to Hire With HepDex"
        subtitle="From screening to onboarding, we'll help you hire remote talent in two weeks."
        animation={false}
        marginBottom={true}
      >
        <Div>
          <Container.Row>
            <Container.Col breakPoints={[{ name: "850px", width: 50 }]}>
              <div className="steps-box">
                <ul className="steps">
                  <Step
                    title="Tell us what you need"
                    text="Share your hiring needs to help us screen the top 2% candidates from our talent network."
                    number={1}
                  />
                  <Step
                    title="Interview our Talent"
                    text="We'll connect you with hand picked, pre screened candidates perfectly aligned with your requirements."
                    number={2}
                  />
                  <Step
                    title="Onboard your Hire"
                    text="Welcome your new remote hire to the team, while we've got everything else covered."
                    number={3}
                  />
                </ul>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "850px", width: 50 }]}>
              <div className="requirement-box">
                <Form $gap={18}>
                  <InputGroup>
                    <FormGroup label="Name">
                      <Input placeholder="Full Name" type="text" required />
                    </FormGroup>
                    <FormGroup label="Email">
                      <Input
                        placeholder="Email Address"
                        type="email"
                        required
                      />
                    </FormGroup>
                  </InputGroup>
                  <InputGroup>
                    <FormGroup label="Phone">
                      <Input placeholder="Phone Number" type="text" required />
                    </FormGroup>
                    <FormGroup label="Company">
                      <Input placeholder="Company Name" type="text" required />
                    </FormGroup>
                  </InputGroup>
                  <InputGroup>
                    <FormGroup label="Job Requirement">
                      <Select>
                        <option value="">Select Requirement</option>
                        <option value="1">Looking for an employee</option>
                        <option value="2">Looking for a service</option>
                        <option value="3">Not sure</option>
                      </Select>
                    </FormGroup>
                    <FormGroup label="Job Duration">
                      <Select>
                        <option value="">Select Duration</option>
                        <option value="1">Less than 1 Month</option>
                        <option value="2">1 to 3 Months</option>
                        <option value="3">3 to 6 Months</option>
                        <option value="4">6 to 12 Months</option>
                        <option value="5">More than 1 Year</option>
                        <option value="6">Not sure</option>
                      </Select>
                    </FormGroup>
                  </InputGroup>
                  <FormGroup label="Work Requirements">
                    <Textarea placeholder="Add Your Requirement" rows={6} />
                  </FormGroup>
                  <Button className="cta">Submit Requirements</Button>
                </Form>
              </div>
            </Container.Col>
          </Container.Row>
        </Div>
      </Section>
    </PageContent>
  );
}
