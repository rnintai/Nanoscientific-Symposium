import { useLocation } from "react-router";

const useSubPath = () => {
  const { pathname } = useLocation();

  return pathname;
};

export default useSubPath;
