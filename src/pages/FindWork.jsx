import styled from "styled-components";
import PageContent from "../components/PageContent";
import Section from "../components/Section";
import SearchBox from "../ui/findJobs/SearchBox";
import ContentLoader from "../components/ContentLoader";
import JobList from "../ui/findJobs/JobList";
import Spinner from "../components/Spinner";
import NoJobs from "../ui/findJobs/NoJobs";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchJobs } from "../services/apiJobs";

const StyledFindWork = styled.div`
  &#find-work {
    .search-box {
      padding: 0px;
    }

    .job {
      border: 1px solid var(--color-grey-3);

      &:hover {
        border: 1px solid var(--color-primary);
      }
    }
  }
`;

export default function FindWork() {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Jobs state
  const [jobs, setJobs] = useState([]);

  // Job title param
  const jobTitle = searchParams.get("jobTitle") ?? "";

  // Input state
  const [inputValue, setInputValue] = useState(jobTitle);

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
    <StyledFindWork
      id="find-work"
      className="custom-fade-up sm"
      data-aos="true"
    >
      <PageContent>
        <Section
          title="Find Work"
          subtitle="Discover opportunities that match your skills and goals."
          marginBottom={true}
          animation={false}
        >
          <div>
            <SearchBox inputValue={inputValue} setInputValue={setInputValue} />
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
                  <NoJobs setInputValue={setInputValue} />
                )}
              </>
            )}
          </div>
        </Section>
      </PageContent>
    </StyledFindWork>
  );
}
