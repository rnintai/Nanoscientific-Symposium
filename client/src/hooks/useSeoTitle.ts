import { useEffect } from "react";

const useSeoTitle = (title: string, country: string) => {
  useEffect(() => {
    document.title = title
      ? `${title} | 2022 Nanoscientific Symposium ${country.toUpperCase()}`
      : `2022 Nanoscientific Symposium ${country.toUpperCase()}`;
  }, []);
};

export default useSeoTitle;
