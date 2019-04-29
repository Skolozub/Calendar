export const getNumberOfDay = (year, month, day) => {
  const dayNum = new Date(year, month, day).getDay();

  return dayNum ? dayNum - 1 : 6;
};
