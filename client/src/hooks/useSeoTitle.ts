import { useEffect } from "react";

const useSeoTitle = (title: string, country: string) => {
  useEffect(() => {
    document.title = title
      ? `${title} | Nanoscientific 2022 ${country.toUpperCase()}`
      : `Nanoscientific 2022 ${country.toUpperCase()}`;
  }, []);
};

export default useSeoTitle;
