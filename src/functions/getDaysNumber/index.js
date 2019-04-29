import { months } from "../../utils/settings";

export const getDaysNumber = (year, month) => {
  if (month === undefined || year === undefined) return null;
  const monthNumber = typeof month === "string" ? months.indexOf(month) : month;

  return new Date(year, monthNumber + 1, 0).getDate();
};
