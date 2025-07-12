import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound() {
  // Document title
  useDocumentTitle("Not found");
  return <div>Not found</div>;
}
