import PageContent from "../components/PageContent";
import Container from "../components/Container";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Section from "../components/Section";
import RequirementSteps from "../ui/requirements/RequirementSteps";
import RequirementsForm from "../ui/requirements/RequirementsForm";
import styled, { css } from "styled-components";
import { BsCheck, BsCheck2, BsCheckCircle } from "react-icons/bs";
import { flex, mq } from "../GlobalStyles";

const StyledPlans = styled.div`
  margin-bottom: 32px;

  ${mq(
    "sm",
    css`
      margin-bottom: 40px;
    `
  )}

  .plan-box {
    padding: 32px 24px;
    border-radius: 8px;
    background-color: var(--color-grey-1);
    height: 100%;

    p {
      color: var(--color-grey-2);
    }

    .top {
      text-align: center;
      margin-bottom: 16px;

      h2 {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 4px;
      }

      p {
        font-size: 18px;
        color: var(--color-black-1);
      }
    }

    .bottom {
      margin-top: 16px;

      h3 {
        font-size: 20px;
        line-height: 24px;

        margin-bottom: 8px;
      }

      ul {
        ${flex(undefined)}
        flex-direction: column;
        gap: 8px;

        li {
          ${flex(undefined, "start")}
          gap: 6px;

          svg {
            height: 24px;
            min-width: 16px;
            fill: var(--color-primary);
          }
        }
      }
    }
  }
`;

export default function Requirements() {
  // Document title
  useDocumentTitle("Submit requirements");

  return (
    <PageContent>
      <Section
        title="Hire Smarter with HepDex"
        subtitle="From screening to onboarding, we'll help you hire remote talent in two weeks."
        spaceBottom={true}
      >
        <StyledPlans>
          <Container.Row data-aos className="custom-fade-up sm">
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="plan-box">
                <div className="top">
                  <h2>HepDex Africa</h2>
                  <p>Hire Africa's top Remote talent</p>
                </div>
                <p style={{ marginBottom: "8px" }}>
                  Hire a High performing remote expert or team from Africa in
                  your time zone for a fraction of what you would pay locally.
                </p>
                <p>
                  We partnered with 100+ organizations across 52 countries in
                  Africa to develop skilled talent hubs that are ready to work.
                </p>
                <div className="bottom">
                  <h3>Benefits:</h3>
                  <ul>
                    <li>
                      <BsCheck2 />

                      <p>
                        A+ candidates vetted and delivered to you to interview
                        and hire.
                      </p>
                    </li>
                    <li>
                      <BsCheck2 />
                      <p>
                        No messy paperwork, we handle payroll for you. You pay
                        us - we pay them.
                      </p>
                    </li>
                    <li>
                      <BsCheck2 />
                      <p>
                        We ensure they show up on time and deliver for the role.
                      </p>
                    </li>
                    <li>
                      <BsCheck2 />
                      <p>
                        Quick turn around. Contact us today, get vetted
                        candidates in 48 hours.
                      </p>
                    </li>
                    <li>
                      <BsCheck2 />
                      <p>
                        You won’t believe the cost savings. We work with your
                        budget.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="plan-box">
                <div className="top">
                  <h2> HepDex World</h2>
                  <p>Hire Experts locally or around the World</p>
                </div>
                <p style={{ marginBottom: "8px" }}>
                  Hiring remote professionals is simple. We will help you find
                  excellent talent anywhere - Whether it is a developer,
                  customer support rep, data scientist, or Ai Engineer. Let’s
                  help you scale your team fast.
                </p>
                <p>
                  We have been providing expert talent to companies all over the
                  world since 2020.
                </p>
                <div className="bottom">
                  <h3>Benefits:</h3>
                  <ul>
                    <li>
                      <BsCheck2 />
                      <p>
                        No messy Interview process. We provide the candidates.
                      </p>
                    </li>
                    <li>
                      <BsCheck2 />
                      <p>
                        We manage the 1099 payroll for US employees only. Other
                        countries - we help you set up payments.
                      </p>
                    </li>
                    <li>
                      <BsCheck2 />
                      <p>Time zone advantage.</p>
                    </li>
                    <li>
                      <BsCheck2 />
                      <p>Only pay when we’ve delivered (zero upfront cost).</p>
                    </li>
                    <li>
                      <BsCheck2 />
                      <p>
                        Fast access to the highest rated experts on our
                        platform.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </Container.Col>
          </Container.Row>
        </StyledPlans>
        <Container.Row className="custom-fade-up sm" data-aos>
          <RequirementSteps />
          <RequirementsForm />
        </Container.Row>
      </Section>
    </PageContent>
  );
}
