import { useLocation } from "react-router";

export const yearList = ["2022", "2023"];
export const defaultYear = "2022";

const useCurrentYear = () => {
  const { pathname } = useLocation();

  const year = pathname.split("/")[2];

  let result = "";
  if (yearList.includes(year)) {
    result = year;
  } else {
    result = defaultYear;
  }

  return result;
  // 두번째 슬래시가 없다면 그냥 그자체로 반환 두번째 슬래시가 있다는것은 그 앞에만 잘라서 건네줘야함
  // return secondSlash === -1 ? pathname : pathname.substring(0, secondSlash);
};

export default useCurrentYear;
