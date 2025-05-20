import { useSearchParams } from "react-router-dom";

export default function usePaginate(pageSize = 10, data = [], searchField) {
  // Search params
  const [searchParams, setSearchParams] = useSearchParams();
  // Page
  const page = Number(searchParams.get("page") ?? 1);
  // Get fields for filter
  const fields = Object.fromEntries(searchParams.entries());
  // Delete page and search field
  delete fields.page;
  delete fields[searchField];
  // Filtered data
  let filteredData = data.filter((item) =>
    Object.entries(fields).every(
      ([key, value]) =>
        item[key]?.toString().toLowerCase() === value.toLowerCase()
    )
  );
  // Search
  if (searchParams.get(searchField)) {
    filteredData = filteredData.filter((item) =>
      item[searchField]
        .toLowerCase()
        .startsWith(searchParams.get(searchField).toLowerCase())
    );
  }

  // Data length
  const dataNum = filteredData.length;
  // Total pages
  const totalPages = Math.ceil(dataNum / pageSize);
  // Start index
  const startIndex = (page - 1) * pageSize;
  // Current page data
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);
  // Page start
  const pageStart = currentData.length
    ? filteredData.indexOf(currentData[0]) + 1
    : 0;
  // Page end
  const pageEnd = currentData.length
    ? filteredData.indexOf(currentData[currentData.length - 1]) + 1
    : 0;
  // Next
  const next = () => {
    const params = new URLSearchParams(searchParams);
    if (page < totalPages) {
      params.set("page", `${page + 1}`);
      setSearchParams(params);
    }
  };
  // Previous
  const previous = () => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", `${page - 1}`);
      setSearchParams(params);
    }
  };
  // Search
  const search = (field, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(field, value);
    // Delete param if value is empty
    if (value === "") params.delete(field);
    // Delete page param
    params.delete("page");
    setSearchParams(params);
  };
  return {
    dataNum,
    totalPages,
    pageStart,
    pageEnd,
    currentData,
    previous,
    next,
    search,
  };
}
