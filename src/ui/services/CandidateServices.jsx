import FindJob from "../../assets/icons/find-job.svg?react";
import Pro from "../../assets/icons/pro.svg?react";
import UploadResume from "../../assets/icons/upload-resume.svg?react";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Service from "../../components/Service";

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

export default function CandidateServices() {
  return (
    <Section
      title="For Job Seekers"
      subtitle="Discover opportunities and advance your career with our comprehensive tools."
      spaceBottom={true}
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
  );
}
