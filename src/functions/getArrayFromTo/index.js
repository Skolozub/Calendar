export const getArrayFromTo = (from, to) => {
  if (from > to) return [];
  return [...Array(++to).keys()].slice(from, to);
};
