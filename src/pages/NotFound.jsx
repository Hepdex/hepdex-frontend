import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound() {
  // Document title
  useDocumentTitle("404");
  return <div>Not found</div>;
}
