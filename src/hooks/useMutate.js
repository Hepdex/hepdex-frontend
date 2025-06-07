import { useState } from "react";

export default function useMutate(api) {
  // Loading state
  const [loading, setLoading] = useState(false);

  // Mutate function
  const mutate = async (data, query = undefined) => {
    try {
      // Set loading state
      setLoading(true);

      // Send request
      const response = await api(data, query);

      // Check response
      if (response) return response;
    } catch (err) {
      // Error
      return err.message;
    } finally {
      // Set loading state
      setLoading(false);
    }
  };
  // Return data
  return [mutate, loading];
}
