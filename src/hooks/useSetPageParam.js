import { useSearchParams } from "react-router-dom";

export default function useSetPage(dataLength) {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  // Change page param if data length is one
  const params = new URLSearchParams(searchParams);
  // Page setter
  const pageSetter = () => {
    if (params.get("page") && dataLength === 1) {
      // Set page param
      let page = Number(params.get("page"));
      if (page > 2) {
        // Previous page
        params.set("page", page - 1);
      } else {
        // First page
        params.delete("page");
      }
      // Update search params
      setSearchParams(params);
    }
  };
  return pageSetter;
}
