import { useEffect } from "react";
import { globalData } from "utils/GlobalData";
import useCurrentYear from "./useCurrentYear";
import useNSSType from "./useNSSType";
import usePageViews from "./usePageViews";

const useSeoTitle = (pathname: string, year: string, nssType: string) => {
  let fullName;

  switch (pathname) {
    case "americas":
    case "jp":
    case "kr":
    case "asia":
    case "eu": {
      fullName = globalData.get(nssType).fullName;
      break;
    }
    default: {
      fullName = `${year} NANOscientific`;
    }
  }

  return fullName;
};

export default useSeoTitle;
