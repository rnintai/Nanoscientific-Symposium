import {useLocation} from "react-router";

const usePageViews = () => {
  let location = useLocation();
  return location.pathname
}

export default usePageViews;
