import Button from "../components/Button";
import DashboardTitle from "../components/DashboardTitle";
import Spinner from "../components/Spinner";
import SearchBox from "../ui/findJobs/SearchBox";
import JobList from "../ui/findJobs/JobList";
import NoJobs from "../ui/findJobs/NoJobs";
import ContentLoader from "../components/ContentLoader";
import { searchJobs } from "../services/apiJobs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function FindJobs() {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Jobs state
  const [jobs, setJobs] = useState([]);

  // Page state
  const page = Number(searchParams.get("page") ?? 1);

  // Pagination
  const [pagination, setPagination] = useState(undefined);

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Get query string
        const queryString = `${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`;

        // Send request
        const response = await searchJobs(undefined, queryString);

        // Check response
        if (response?.jobs) {
          // Set jobs
          setJobs((prev) =>
            Number(response.pagination.currentPage) === 1
              ? response.jobs
              : [...prev, ...response.jobs]
          );

          // Set pagination
          setPagination(response.pagination);
        }
      } catch (err) {
        // Log error
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

  return (
    <>
      <DashboardTitle
        title="Find jobs"
        subtitle="Discover your next big opportunity"
        links={[{ name: "Find jobs" }]}
      />
      <SearchBox />
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
                      const params = new URLSearchParams();
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
