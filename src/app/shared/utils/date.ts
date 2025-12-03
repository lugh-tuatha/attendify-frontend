export const getLastTwoMonthDate = (): Date => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 2);
  return lastMonth;
};
