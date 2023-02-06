import useAdminStore from "store/AdminStore";
import useCurrentYear, { defaultYear } from "./useCurrentYear";
import usePageViews from "./usePageViews";

const useNSSType = () => {
  const pathname = usePageViews();
  const year = useCurrentYear();
  const { currentLanguage} = useAdminStore();

  if(pathname === "home") return "home";
  return pathname === "china" ? `${pathname}${year !== undefined ? year : ""}_${currentLanguage}` : `${pathname}${year !== undefined ? year : defaultYear}`;
  // return pathname === "home"
  //   ? "home"
  //   : 
    // : `${pathname}${year !== undefined ? year : defaultYear}`;
};

export default useNSSType;
