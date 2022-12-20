import { useLocation } from "react-router";

const useCurrentYear = () => {
  const { pathname } = useLocation();

  const year = pathname.split("/")[2];

  let result = "";
  switch (year) {
    case "2023": {
      result = year;
      break;
    }
    default: {
      result = "2022";
    }
  }

  // 두번째 슬래시 나오는곳까지 자릅니다
  return result;
  // 두번째 슬래시가 없다면 그냥 그자체로 반환 두번째 슬래시가 있다는것은 그 앞에만 잘라서 건네줘야함
  // return secondSlash === -1 ? pathname : pathname.substring(0, secondSlash);
};

export default useCurrentYear;
