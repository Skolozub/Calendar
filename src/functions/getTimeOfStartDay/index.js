export const getTimeOfStartDay = (year, month, day) =>
  new Date(year, month, day, 0, 0, 0).getTime();
