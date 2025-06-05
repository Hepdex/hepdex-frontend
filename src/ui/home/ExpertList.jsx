import Container from "../../components/Container";
import Section from "../../components/Section";
import Expert from "../../components/Expert";
import { experts } from "../../data/experts";

export default function ExpertList() {
  return (
    <Section
      title="Leverage top experts"
      subtitle="Find skilled professionals your business deserves."
    >
      <div data-aos className="custom-fade-up">
        <Container.Row>
          {experts.map((expert, index) => (
            <Expert key={index} expert={expert} />
          ))}
        </Container.Row>
      </div>
    </Section>
  );
}
