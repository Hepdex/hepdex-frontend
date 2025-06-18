import Button from "../components/Button";
import DashboardTitle from "../components/DashboardTitle";
import Spinner from "../components/Spinner";
import NoJobs from "../components/NoJobs";
import JobList from "../components/JobList";
import JobSearch from "../components/JobSearch";
import ContentLoader from "../components/ContentLoader";
import useSearchJobs from "../hooks/useSearchJobs";

export default function FindJobs() {
  // Search jobs hook
  const {
    jobs,

    page,
    pagination,
    loading,
    searchParams,
    setSearchParams,
  } = useSearchJobs();
  return (
    <>
      <DashboardTitle
        title="Find jobs"
        subtitle="Discover your next big opportunity"
        links={[{ name: "Find jobs" }]}
      />
      <JobSearch />
      {loading && (page === 1 || !pagination) ? (
        <ContentLoader />
      ) : (
        <>
          {jobs?.length > 0 ? (
            <JobList jobs={jobs}>
              {!pagination.isLastPage && (
                <div className="load-more">
                  <Button
                    $loading={loading}
                    disabled={loading}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("page", Number(pagination.currentPage) + 1);
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
    </>
  );
}
