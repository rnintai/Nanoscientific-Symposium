import useCurrentYear from "./useCurrentYear";
import usePageViews from "./usePageViews";

const useNSSType = () => {
  const pathname = usePageViews();
  const year = useCurrentYear();

  return `${pathname}${year !== undefined ? year : ""}`;
};

export default useNSSType;
