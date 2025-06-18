import PageContent from "../components/PageContent";
import Stats from "../ui/services/Stats";
import CandidateServices from "../ui/services/CandidateServices";
import EmployerServices from "../ui/services/EmployerServices";
import GetStarted from "../ui/services/GetStarted";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ServicesPage = () => {
  // Document title
  useDocumentTitle("Services");
  return (
    <PageContent>
      <Stats />
      <EmployerServices />
      <CandidateServices />
      <GetStarted />
    </PageContent>
  );
};

export default ServicesPage;
