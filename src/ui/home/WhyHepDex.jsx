import styled, { css } from "styled-components";
import Container from "../../components/Container";
import Section from "../../components/Section";
import { flex, mq } from "../../GlobalStyles";

const Div = styled.div`
  &.reason {
    & > .icon {
      background-color: var(--color-secondary);
      width: 80px;
      height: 80px;
      border-radius: 8px;
      ${flex("center", "center")}
      margin-bottom: 24px;
    }
    & > .title {
      font-size: 22px;
      line-height: 32px;
      text-align: left;
      margin-bottom: 8px;
    }
    & > .text {
      color: var(--color-grey-2);
      width: 100%;
      ${mq(
        "md",
        css`
          max-width: 300px;
        `
      )}
    }
  }
`;

export default function WhyHepDex() {
  return (
    <Section
      title="Why choose HepDex?"
      subtitle="HepDex gives you the tools to scale your business."
      marginBottom={true}
    >
      <div data-aos className="custom-fade-up">
        <Container.Row>
          <Container.Col breakPoints={[{ name: "700px", cols: 3 }]}>
            <Div className="reason">
              <div className="icon">
                <img alt="budget-icon" src="/icons/budget.svg" />
              </div>
              <h3 className="title">Reduce Hiring Costs</h3>
              <p className="text">
                Save money by connecting directly with qualified candidates. No
                middlemen and inflated agency fees.
              </p>
            </Div>
          </Container.Col>
          <Container.Col breakPoints={[{ name: "700px", cols: 3 }]}>
            <Div className="reason">
              <div className="icon">
                <img alt="talent-icon" src="/icons/talent.svg" />
              </div>
              <h3 className="title">Tap Into Top Talent</h3>
              <p className="text">
                Access a high-quality network of professionals, ready to drive
                your business forward.
              </p>
            </Div>
          </Container.Col>
          <Container.Col breakPoints={[{ name: "700px", cols: 3 }]}>
            <Div className="reason">
              <div className="icon">
                <img alt="flash-icon" src="/icons/flash.svg" />
              </div>
              <h3 className="title">Faster Time-to-Hire</h3>
              <p className="text">
                Fill roles quickly with smart matching and a pre-vetted talent
                pool — less time searching, more time building.
              </p>
            </Div>
          </Container.Col>
        </Container.Row>
      </div>
    </Section>
  );
}
