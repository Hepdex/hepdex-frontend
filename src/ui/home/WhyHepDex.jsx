import Container from "../../components/Container";
import Section from "../../components/Section";
import Budget from "../../assets/icons/budget.svg?react";
import Talent from "../../assets/icons/talent.svg?react";
import Flash from "../../assets/icons/flash.svg?react";
import Service from "../../components/Service";

export default function WhyHepDex() {
  return (
    <Section
      title="Why Hire with HepDex?"
      subtitle="HepDex gives you the tools to scale your business."
      spaceBottom={true}
    >
      <div data-aos className="custom-fade-up">
        <Container.Row>
          <Service
            title="Reduce Hiring Costs"
            text=" Save money by connecting directly with qualified candidates. No
                middlemen and inflated agency fees."
            icon={<Budget />}
          />
          <Service
            title="Tap Into Top Talent"
            text="Access a high-quality network of professionals, ready to drive
              your business forward."
            icon={<Talent />}
          />
          <Service
            title="Faster Time-to-Hire"
            text="Fill roles quickly with smart matching and a pre-vetted talent
              pool — less time searching, more time building."
            icon={<Flash />}
          />
        </Container.Row>
      </div>
    </Section>
  );
}
