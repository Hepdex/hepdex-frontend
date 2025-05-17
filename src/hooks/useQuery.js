import { useEffect, useState } from "react";

export default function useQuery(api, query = undefined) {
  // Loading state
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  // Run query
  useEffect(() => {
    (async () => {
      try {
        const response = await api(undefined, query);
        if (response) setData(response);
      } catch (err) {
        // Log error
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [api, query]);
  // Return data
  return [data, loading, setData];
}
