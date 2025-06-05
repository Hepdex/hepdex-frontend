import Container from "../../components/Container";
import Section from "../../components/Section";
import Budget from "../../assets/icons/budget.svg?react";
import Talent from "../../assets/icons/talent.svg?react";
import Flash from "../../assets/icons/flash.svg?react";
import styled, { css } from "styled-components";
import { mq } from "../../GlobalStyles";

const Box = styled.div`
  & > .title {
    font-size: 22px;
    line-height: 32px;
    text-align: left;
    margin-bottom: 4px;
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
`;

export default function WhyHepDex({ animation = true }) {
  return (
    <Section
      title="Why Hire with HepDex?"
      subtitle="HepDex gives you the tools to scale your business."
      marginBottom={true}
      animation={animation}
    >
      <div data-aos className={`${animation ? "custom-fade-up" : ""}`}>
        <Container.Row>
          <Container.Col breakPoints={[{ name: "700px", cols: 3 }]}>
            <Box>
              <div className="box-icon">
                <Budget />
              </div>
              <h3 className="title">Reduce Hiring Costs</h3>
              <p className="text">
                Save money by connecting directly with qualified candidates. No
                middlemen and inflated agency fees.
              </p>
            </Box>
          </Container.Col>
          <Container.Col breakPoints={[{ name: "700px", cols: 3 }]}>
            <Box>
              <div className="box-icon">
                <Talent />
              </div>
              <h3 className="title">Tap Into Top Talent</h3>
              <p className="text">
                Access a high-quality network of professionals, ready to drive
                your business forward.
              </p>
            </Box>
          </Container.Col>
          <Container.Col breakPoints={[{ name: "700px", cols: 3 }]}>
            <Box>
              <div className="box-icon">
                <Flash />
              </div>
              <h3 className="title">Faster Time-to-Hire</h3>
              <p className="text">
                Fill roles quickly with smart matching and a pre-vetted talent
                pool — less time searching, more time building.
              </p>
            </Box>
          </Container.Col>
        </Container.Row>
      </div>
    </Section>
  );
}
