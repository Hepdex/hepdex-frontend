import Container from "../components/Container";
import Button from "../components/Button";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import Step from "../components/Step";
import styled, { css } from "styled-components";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  Select,
  Textarea,
} from "../components/Form";
import { mq } from "../GlobalStyles";
import useDocumentTitle from "../utils/TitleUpdater";

const Box = styled.div`
  .steps-box {
    background-color: var(--color-secondary);
    border-radius: 8px;
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
        title="Hire Smarter with HepDex"
        subtitle="From screening to onboarding, we'll help you hire remote talent in two weeks."
        animation={false}
        marginBottom={true}
      >
        <Box>
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
                    <FormGroup>
                      <Input placeholder="Full name" type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        placeholder="Email address"
                        type="email"
                        required
                      />
                    </FormGroup>
                  </InputGroup>
                  <InputGroup>
                    <FormGroup>
                      <Input placeholder="Phone number" type="text" required />
                    </FormGroup>
                    <FormGroup>
                      <Input placeholder="Company name" type="text" required />
                    </FormGroup>
                  </InputGroup>
                  <InputGroup>
                    <FormGroup>
                      <Select>
                        <option value="">Select requirement</option>
                        <option value="1">Looking for an employee</option>
                        <option value="2">Looking for a service</option>
                        <option value="3">Not sure</option>
                      </Select>
                    </FormGroup>
                    <FormGroup>
                      <Select>
                        <option value="">Select duration</option>
                        <option value="1">Less than 1 Month</option>
                        <option value="2">1 to 3 Months</option>
                        <option value="3">3 to 6 Months</option>
                        <option value="4">6 to 12 Months</option>
                        <option value="5">More than 1 Year</option>
                        <option value="6">Not sure</option>
                      </Select>
                    </FormGroup>
                  </InputGroup>
                  <FormGroup>
                    <Textarea placeholder="Requirement details" rows={8} />
                  </FormGroup>
                  <Button className="cta">Submit requirements</Button>
                </Form>
              </div>
            </Container.Col>
          </Container.Row>
        </Box>
      </Section>
    </PageContent>
  );
}
