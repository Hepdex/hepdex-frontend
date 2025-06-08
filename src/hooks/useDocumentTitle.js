import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `HepDex -  ${title}`;
  }, [title]);
}
