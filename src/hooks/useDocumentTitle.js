import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | LocalChefBazaar`;
    return () => {
      document.title = "LocalChefBazaar";
    };
  }, [title]);
};
