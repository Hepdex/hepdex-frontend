import Container from "../../components/Container";
import Section from "../../components/Section";
import Service from "../../components/Service";
import { services } from "../../data/services";

export default function ServiceList() {
  return (
    <Section
      title="Leverage top experts"
      subtitle="Find skilled professionals your business deserves."
    >
      <div data-aos className="custom-fade-up">
        <Container.Row>
          {services.map((service, index) => (
            <Service key={index} service={service} />
          ))}
        </Container.Row>
      </div>
    </Section>
  );
}
