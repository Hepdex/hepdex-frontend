import styled from "styled-components";
import Button from "../../components/Button";
import Section from "../../components/Section";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { flex } from "../../GlobalStyles";

// Get started container
const StyledGetStarted = styled.div`
  .get-started {
    background-color: var(--color-secondary);

    .title {
      margin-bottom: 32px;
    }

    p {
      color: var(--color-black-1);
    }

    &--cta {
      ${flex("center", "center")}
      gap: 16px;
    }
  }
`;

export default function GetStarted() {
  // User context
  const { user, isLoggedIn } = useUserContext();

  return (
    <StyledGetStarted>
      <Section
        title="Ready to Get Started?"
        subtitle="Join thousands of employers and job seekers who trust HepDex with their career."
        spaceBottom="true"
        className="get-started"
      >
        <div className="get-started--cta custom-fade-up" data-aos>
          <Button
            size="lg"
            as={Link}
            to={`${
              user?.role === "employer" && isLoggedIn ? "/post-a-job" : "/login"
            }`}
          >
            Post a Job
          </Button>
          <Button color="outline" size="lg" as={Link} to={"/find-work"}>
            Find Work
          </Button>
        </div>
      </Section>
    </StyledGetStarted>
  );
}
