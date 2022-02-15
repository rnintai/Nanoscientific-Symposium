import { useEffect } from "react";

const useSeoTitle = (title: string, country: string) => {
  useEffect(() => {
    document.title = title
      ? `${title} | Nanoscientific 2022 ${country
          .replace("/", "")
          .toUpperCase()}`
      : `Nanoscientific 2022 ${country.replace("/", "").toUpperCase()}`;
  }, []);
};

export default useSeoTitle;
