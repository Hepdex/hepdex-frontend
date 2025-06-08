import AddJob from "../../assets/icons/add-job.svg?react";
import SearchTalent from "../../assets/icons/search-talent.svg?react";
import SendRequirement from "../../assets/icons/send-requirement.svg?react";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Service from "../../components/Service";

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

export default function EmployerServices() {
  return (
    <Section
      title="For Employers"
      subtitle="Streamline your hiring process and find the best talent for your organization."
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
  );
}
