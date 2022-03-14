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
    // weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
