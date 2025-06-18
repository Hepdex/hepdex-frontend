import PageContent from "../components/PageContent";
import Section from "../components/Section";
import ContentLoader from "../components/ContentLoader";
import NoJobs from "../components/NoJobs";
import JobList from "../components/JobList";
import JobSearch from "../components/JobSearch";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import useSearchJobs from "../hooks/useSearchJobs";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function FindWork() {
  // Search jobs hook
  const { jobs, page, pagination, loading, searchParams, setSearchParams } =
    useSearchJobs();

  useDocumentTitle("Find work");

  return (
    <div className="custom-fade-up sm" data-aos>
      <PageContent>
        <Section
          title="Browse open jobs"
          subtitle="Discover opportunities that match your skills and goals."
          spaceBottom={true}
          animation={false}
        >
          <JobSearch />
          {loading && (page === 1 || !pagination) ? (
            <ContentLoader />
          ) : (
            <>
              {jobs?.length > 0 ? (
                <JobList jobs={jobs} alternate>
                  {!pagination.isLastPage && (
                    <div className="load-more">
                      <Button
                        $loading={loading}
                        disabled={loading}
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set(
                            "page",
                            Number(pagination.currentPage) + 1
                          );
                          setSearchParams(params);
                        }}
                      >
                        <span>Load more</span>
                        {loading && <Spinner />}
                      </Button>
                    </div>
                  )}
                </JobList>
              ) : (
                <NoJobs />
              )}
            </>
          )}
        </Section>
      </PageContent>
    </div>
  );
}
