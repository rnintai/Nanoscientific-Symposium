import { useEffect } from "react";
import { globalData } from "utils/GlobalData";
import usePageViews from "./usePageViews";

const useSeoTitle = (pathname: string) => {
  let fullName;

  switch (pathname) {
    case "americas":
    case "jp":
    case "kr":
    case "asia":
    case "eu": {
      fullName = globalData.get(pathname).fullName;
      break;
    }
    default: {
      fullName = "2022 NanoScientific";
    }
  }

  return fullName;
};

export default useSeoTitle;
