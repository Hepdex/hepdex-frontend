import PageContent from "../components/PageContent";
import Container from "../components/Container";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Section from "../components/Section";
import RequirementSteps from "../ui/requirements/RequirementSteps";
import RequirementsForm from "../ui/requirements/RequirementsForm";

export default function Requirements() {
  // Document title
  useDocumentTitle("Share requirements");

  return (
    <PageContent>
      <Section
        title="Hire Smarter with HepDex"
        subtitle="From screening to onboarding, we'll help you hire remote talent in two weeks."
        spaceBottom={true}
      >
        <Container.Row className="custom-fade-up sm" data-aos>
          <RequirementSteps />
          <RequirementsForm />
        </Container.Row>
      </Section>
    </PageContent>
  );
}
