import { useLocation } from "react-router";
import usePageViews from "./usePageViews";

const useSubPath = () => {
  const nation = usePageViews();
  const { pathname } = useLocation();

  if (nation === "common") {
    return pathname;
  }
  return ["", ...pathname.split("/").slice(2)].join("/");
};

export default useSubPath;
