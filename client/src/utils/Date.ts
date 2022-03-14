export const dateToLocaleString = (date: string, timeZone: string) => {
  // ex> Mon, Jan 17, 2022, 02:00 PM
  // return new Date(date).toLocaleString("en-US", {
  //   timeZone,
  //   weekday: "short",
  //   year: "numeric",
  //   month: "short",
  //   day: "2-digit",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // ex> 2022-01-11 17:30
  return new Date(date).toLocaleString("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// duration을 계산하여 hh:mm string을 반환하는 메서드
export const calculateDurationToString = (
  startTime: string,
  duration: number,
  timeZone: string,
) => {
  const time = new Date(startTime);
  const minute = time.getMinutes();
  time.setMinutes(minute + duration);

  const timeString = time.toLocaleString("sv-SE", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeString;
};

export const calculateDurationToDate = (
  startTime: string,
  duration: number,
) => {
  const time = new Date(startTime);
  const minute = time.getMinutes();
  time.setMinutes(minute + duration);
  return time;
};
