import useCurrentYear, { defaultYear } from "./useCurrentYear";
import usePageViews from "./usePageViews";

const useNSSType = () => {
  const pathname = usePageViews();
  const year = useCurrentYear();

  return pathname === "home"
    ? "home"
    : `${pathname}${year !== undefined ? year : defaultYear}`;
};

export default useNSSType;
