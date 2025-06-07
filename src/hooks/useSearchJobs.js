import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchJobs } from "../services/apiJobs";

export default function useSearchJobs() {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();

  // Jobs state
  const [jobs, setJobs] = useState([]);

  // Job title
  const [jobTitle, setJobTitle] = useState(searchParams.get("jobTitle") ?? "");

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

  return {
    jobs,
    jobTitle,
    setJobTitle,
    pagination,
    loading,
    page,
    searchParams,
    setSearchParams,
  };
}
