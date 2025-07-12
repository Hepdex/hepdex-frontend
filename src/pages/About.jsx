import styled from "styled-components";
import useDocumentTitle from "../hooks/useDocumentTitle";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import Container from "../components/Container";
import { BsCheckCircle } from "react-icons/bs";
import { flex } from "../GlobalStyles";

const StyledAbout = styled.div`
  ul {
    row-gap: 16px;
  }

  .value-box {
    border-radius: 8px;
    background-color: var(--color-grey-1);
    padding: 20px 24px;
    ${flex(undefined)}
    flex-direction: column;
    gap: 8px;
    height: 100%;

    .top {
      ${flex(undefined, "center")}
      gap: 8px;

      h3 {
        font-size: 22px;
        line-height: 24px;
        font-weight: 500;
      }

      svg {
        fill: var(--color-primary);
      }
    }

    p {
      color: var(--color-grey-2);
    }
  }
`;

export default function About() {
  // Document title
  useDocumentTitle("About us");

  return (
    <StyledAbout>
      <PageContent>
        <Section
          title="About HepDex"
          subtitle="Built on Purpose. Driven by Impact."
        >
          <Container.Row data-aos className="custom-fade-up">
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <p>
                HepDex is a recruitment platform and network specializing in
                delivering remote tailored talent to organizations worldwide.
                With over 11 years of experience and a proven track record of
                partnering with 500+ companies, we excel in addressing diverse
                staffing and recruitment needs across Technology, Finance,
                Legal, and other critical functions. At HepDex, we provide
                end-to-end recruitment support from high-volume staffing for
                operational excellence to executive-level searches that drive
                strategic leadership
              </p>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <p>
                Our expertise in strategic hiring ensures companies can scale
                their teams effectively while meeting the highest standards of
                diversity, equity, and inclusion. We pride ourselves on
                redefining recruitment by blending cutting-edge technology with
                personalized service, ensuring that every hire contributes to
                long-term business success and innovation. With a relentless
                focus on quality and human connection, we’re not just filling
                roles—we’re building the future of work.
              </p>
            </Container.Col>
          </Container.Row>
        </Section>
        <Section
          title="Our Values"
          subtitle="The Principles That Guide Everything We Do"
          spaceBottom
        >
          <Container.Row data-aos className="custom-fade-up sm">
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="value-box">
                <div className="top">
                  <BsCheckCircle size={20} />
                  <h3>Innovation</h3>
                </div>
                <p>
                  We embrace technology and forward-thinking strategies to
                  constantly improve how companies hire and grow.
                </p>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="value-box">
                <div className="top">
                  <BsCheckCircle size={20} />
                  <h3>Human-centered approach</h3>
                </div>
                <p>
                  While we use cutting-edge tools, we never lose sight of the
                  people behind every role, ensuring empathy and understanding
                  guide every decision.
                </p>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="value-box">
                <div className="top">
                  <BsCheckCircle size={20} />
                  <h3>Equal opportunity</h3>
                </div>
                <p>
                  We believe talent knows no boundaries. That’s why we work to
                  ensure every person has fair access to opportunities.
                </p>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="value-box">
                <div className="top">
                  <BsCheckCircle size={20} />
                  <h3>Excellence</h3>
                </div>
                <p>
                  We hold ourselves to the highest standards, delivering
                  top-tier service and long-term hiring solutions that drive
                  sustainable business success.
                </p>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="value-box">
                <div className="top">
                  <BsCheckCircle size={20} />
                  <h3>Transparency</h3>
                </div>
                <p>
                  We believe in clear communication and honest
                  partnerships—internally and with our clients at every step of
                  the way.
                </p>
              </div>
            </Container.Col>
            <Container.Col breakPoints={[{ name: "md", cols: 2 }]}>
              <div className="value-box">
                <div className="top">
                  <BsCheckCircle size={20} />
                  <h3>Impact driven</h3>
                </div>
                <p>
                  Every hire we help make isn’t just about filling a role. it’s
                  about shaping teams that create measurable and meaningful
                  outcomes.
                </p>
              </div>
            </Container.Col>
          </Container.Row>
        </Section>
      </PageContent>
    </StyledAbout>
  );
}
