import Container from "../../components/Container";
import Section from "../../components/Section";
import Service from "../../components/Service";
import styled from "styled-components";
import { services } from "../../data/services";
import { Link } from "react-router-dom";

const Box = styled.div`
  margin-top: 32px;
  text-align: center;
  a {
    color: var(--color-primary);
  }
`;

export default function ServiceList() {
  return (
    <Section
      title="Leverage top services"
      subtitle="We deliver the quality and precision your business deserves."
    >
      <div data-aos className="custom-fade-up">
        <Container.Row>
          {services.map((service, index) => (
            <Service key={index} service={service} />
          ))}
        </Container.Row>
      </div>
      <Box>
        <Link>View all services</Link>
      </Box>
    </Section>
  );
}
