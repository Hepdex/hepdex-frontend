import PageContent from "../components/PageContent";
import Section from "../components/Section";
import Stat from "../components/Stat";
import styled from "styled-components";
import Button from "../components/Button";
import Container from "../components/Container";
import Service from "../components/Service";
import AddJob from "../assets/icons/add-job.svg?react";
import SearchTalent from "../assets/icons/search-talent.svg?react";
import SendRequirement from "../assets/icons/send-requirement.svg?react";
import FindJob from "../assets/icons/find-job.svg?react";
import Pro from "../assets/icons/pro.svg?react";
import UploadResume from "../assets/icons/upload-resume.svg?react";
import { flex } from "../GlobalStyles";
import { BsBriefcase, BsCheck2Circle, BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const employerServices = [
  {
    icon: <AddJob />,
    title: "Post a Job",
    description:
      "Effortless hiring made easy with flexible roles, intelligent matching, and customizable job posts.",
  },
  {
    icon: <SearchTalent />,
    title: "Find Remote Talent",
    description:
      "Access top global talent with flexible time zone alignment and hassle-free onboarding.",
  },
  {
    icon: <SendRequirement />,
    title: "Submit requirements",
    description:
      "Build your team faster with quick project setup, fast talent matches, and a shortlist tailored to your needs.",
  },
];

const candidateServices = [
  {
    icon: <FindJob />,
    title: "Find Jobs",
    description:
      "Discover tailored opportunities, filter by what matters, and apply quickly with your resume.",
  },
  {
    icon: <UploadResume />,
    title: "Resume Upload",
    description:
      "Highlight your strengths, get matched with the right jobs, and stand out to leading employers.",
  },
  {
    icon: <Pro />,
    title: "HepDex Pro",
    description:
      "Stand out with a verified profile, showcase your expertise, and get priority access to top career opportunities.",
  },
];

// Services container
const StyledServices = styled.div`
  .stats-list {
    ${flex("center", "center")}
    flex-wrap: wrap;
    margin: 0 auto;
    width: 100%;
    gap: 30px;
  }

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

const ServicesPage = () => {
  // User context
  const { user, isLoggedIn } = useUserContext();

  return (
    <StyledServices>
      <PageContent>
        <Section
          title="Utilize top Services"
          subtitle="We deliver the quality and precision your business deserves."
        >
          <ul className="stats-list custom-fade-up" data-aos>
            <Stat
              text="Active Jobs"
              value={"10K+"}
              icon={<BsBriefcase size={32} />}
            />
            <Stat
              text="Registered Users"
              value={"50K+"}
              icon={<BsPerson size={32} />}
            />
            <Stat
              text="Success Rate"
              value={"95%"}
              icon={<BsCheck2Circle size={32} />}
            />
          </ul>
        </Section>
        {/* Employer Services */}
        <Section
          title="For Employers"
          subtitle="Streamline your hiring process and find the best talent for
                  your organization."
        >
          <Container.Row className="custom-fade-up" data-aos>
            {employerServices.map((service, index) => (
              <Service
                key={index}
                icon={service.icon}
                text={service.description}
                title={service.title}
              />
            ))}
          </Container.Row>
        </Section>
        {/* Candidate Services */}
        <Section
          title="For Job Seekers"
          subtitle="Discover opportunities and advance your career with our
                  comprehensive tools."
          marginBottom={true}
        >
          <Container.Row className="custom-fade-up" data-aos>
            {candidateServices.map((service, index) => (
              <Service
                key={index}
                icon={service.icon}
                text={service.description}
                title={service.title}
              />
            ))}
          </Container.Row>
        </Section>
        <Section
          title="Ready to Get Started?"
          subtitle="Join thousands of employers and job seekers who trust HepDex with their career."
          marginBottom="true"
          className="get-started"
        >
          <div className="get-started--cta custom-fade-up" data-aos>
            <Button
              size="lg"
              as={Link}
              to={`${
                user?.role === "employer" && isLoggedIn
                  ? "/post-a-job"
                  : "/login"
              }`}
            >
              Post a Job
            </Button>
            <Button color="outline" size="lg" as={Link} to={"/find-work"}>
              Find Work
            </Button>
          </div>
        </Section>
      </PageContent>
    </StyledServices>
  );
};

export default ServicesPage;
