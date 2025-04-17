import Container from "./Container";
import Section from "./Section";
import { motion } from "framer-motion";

export default function WhyHepDex() {
  return (
    <Section
      title="Why choose HepDex?"
      subtitle="HepDex gives you the tools to scale your business."
      marginBottom={true}
    >
      <Container.Row>
        <Container.Col breakPoints={[{ name: "md", cols: 3 }]}>
          <motion.div
            className="reason"
            initial={{ opacity: 0, y: "50%" }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              ease: "easeIn",
            }}
          >
            <div className="icon">
              <img alt="budget-icon" src="/icons/budget.svg" />
            </div>
            <h3 className="title">Reduce Hiring Costs</h3>
            <p className="text">
              Save money by connecting directly with qualified candidates. No
              middlemen and inflated agency fees.
            </p>
          </motion.div>
        </Container.Col>
        <Container.Col breakPoints={[{ name: "md", cols: 3 }]}>
          <motion.div
            className="reason"
            initial={{ opacity: 0, y: "50%" }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              ease: "easeIn",
            }}
          >
            <div className="icon">
              <img alt="talent-icon" src="/icons/talent.svg" />
            </div>
            <h3 className="title">Tap Into Top Talent</h3>
            <p className="text">
              Access a high-quality network of professionals, ready to drive
              your business forward.
            </p>
          </motion.div>
        </Container.Col>
        <Container.Col breakPoints={[{ name: "md", cols: 3 }]}>
          <motion.div
            className="reason"
            initial={{ opacity: 0, y: "50%" }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              ease: "easeIn",
            }}
          >
            <div className="icon">
              <img alt="flash-icon" src="/icons/flash.svg" />
            </div>
            <h3 className="title">Faster Time-to-Hire</h3>
            <p className="text">
              Fill roles quickly with smart matching and a pre-vetted talent
              pool — less time searching, more time building.
            </p>
          </motion.div>
        </Container.Col>
      </Container.Row>
    </Section>
  );
}
