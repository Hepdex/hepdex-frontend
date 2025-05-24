import Container from "../../components/Container";
import DashboardCard from "./DashboardCard";
import AddJob from "../../assets/icons/add-job.svg?react";
import SearchTalent from "../../assets/icons/search-talent.svg?react";
import SendRequirement from "../../assets/icons/send-requirement.svg?react";

// Employer cards
const employerCards = [
  {
    icon: <AddJob />,
    title: "Post a Job",
    text: "Designed to make hiring effortless",
    features: [
      "Flexible job types",
      "Targeted role and skills matching",
      "Engaging, customizable job descriptions",
    ],
    btnText: "Post a Job",
    url: "/post-a-job",
  },
  {
    icon: <SearchTalent />,
    title: "Find Remote Talent",
    text: "Access top professionals worldwide",
    features: [
      "Flexible time zone matching",
      "Global talent pool at your fingertips",
      "Streamlined onboarding support",
    ],
    btnText: "Find remote talent",
    url: "/dashboard/browse-talent",
  },
  {
    icon: <SendRequirement />,
    title: "Submit Requirements",
    text: "Let's help you build your team",
    features: [
      "Share project details in minutes",
      "Talent recommendations delivered fast",
      "Customized shortlist based on your needs",
    ],
    btnText: "Submit requirements",
    url: "/share-requirement",
  },
];

export default function EmployerDashboardContent() {
  return (
    <Container.Row>
      {employerCards.map((card, index) => (
        <DashboardCard
          key={index}
          icon={card.icon}
          title={card.title}
          text={card.text}
          features={card.features}
          btnText={card.btnText}
          url={card.url}
        />
      ))}
    </Container.Row>
  );
}
