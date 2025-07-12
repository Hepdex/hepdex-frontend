import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = `HepDex -  ${title}`;
    } else {
      document.title = "HepDex";
    }
  }, [title]);
}
