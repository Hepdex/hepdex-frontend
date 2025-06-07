import { useEffect, useState } from "react";

export default function useQuery(api, query = undefined) {
  // Loading state
  const [loading, setLoading] = useState(true);

  // Data state
  const [data, setData] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        // Send request
        const response = await api(undefined, query);

        // Check response
        if (response) setData(response);
      } catch (err) {
        // Error
        console.log(err.message);
      } finally {
        // Set loading state
        setLoading(false);
      }
    })();
  }, [api, query]);

  // Return data
  return [data, loading, setData];
}
