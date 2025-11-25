export const getLastMonthDate = (): Date => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);
  return lastMonth;
};
