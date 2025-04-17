import styled from "styled-components";
import Section from "./Section";
import Button from "./button";
import { motion } from "framer-motion";
import { flex } from "../GlobalStyles";
import { Link } from "react-router-dom";

const Div = styled.div`
  padding: 96px;
  background-color: var(--color-secondary);
  & > section {
    margin: 0px;
    .steps {
      ${flex("center")}
      flex-direction: column;
      li.step {
        ${flex("center", "start")}
        column-gap: 56px;
        .content {
          max-width: 500px;
          .step-title {
            font-size: 24px;
            line-height: 40px;
            margin-bottom: 8px;
          }
        }
      }
    }
    .btn-box {
      ${flex("center")}
      margin-top: 48px;
    }
  }
`;

export default function HowItWorks() {
  return (
    <Div>
      <Section title="How it works">
        <ul className="steps">
          <motion.li
            className="step"
            initial={{ y: "50%", opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              ease: "easeIn",
            }}
          >
            <div className="img">
              <img src="/icons/step-1.svg" alt="step-1" />
            </div>
            <div className="content">
              <h3 className="step-title">Post a project for free</h3>
              <p className="text-md">
                Complete in just 3-5 minutes, with full control over how our
                experts connect with you.
              </p>
            </div>
          </motion.li>
          <motion.li
            className="step"
            initial={{ y: "50%", opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              ease: "easeIn",
            }}
          >
            <div className="img">
              <img src="/icons/step-2.svg" alt="step-2" />
            </div>
            <div className="content">
              <h3 className="step-title">Match with expert talent</h3>
              <p className="step-text">
                Get matched with the ideal talent for your project in a few
                days. On average, it takes less than 24 hours.
              </p>
            </div>
          </motion.li>
          <motion.li
            className="step"
            initial={{ y: "50%", opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.4,
              ease: "easeIn",
            }}
          >
            <div className="img">
              <img src="/icons/step-3.svg" alt="step-3" />
            </div>
            <div className="content">
              <h3 className="step-title">Get the right match</h3>
              <p className="step-text">
                Work with your new team member on a trial basis and pay only if
                you are satisfied, ensuring you hire the right person for the
                job.
              </p>
            </div>
          </motion.li>
        </ul>
        <motion.div
          className="btn-box"
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.4,
            ease: "easeIn",
          }}
        >
          <Button as={Link} to="/post-a-project" size="lg">
            Post your project
          </Button>
        </motion.div>
      </Section>
    </Div>
  );
}
