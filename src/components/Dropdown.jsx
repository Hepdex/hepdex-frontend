import { useEffect } from "react";

export default function Dropdown({ close, children, menuId, btnId }) {
  useEffect(() => {
    // Listen handler
    const listen = (e) => {
      const button = document.getElementById(btnId);
      const menu = document.getElementById(menuId);
      const element = e.target;
      if (button?.contains(element) || menu?.contains(element)) return;
      else close();
    };
    // Listen for click event
    document.addEventListener("click", listen);
    return () => {
      // Remove event listener
      document.removeEventListener("click", listen);
    };
  }, [close, menuId, btnId]);

  return <>{children}</>;
}
