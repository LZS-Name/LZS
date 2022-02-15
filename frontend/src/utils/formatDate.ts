function formatDateToDateMonthYear(originalDate: Date | number) {
  if (!originalDate) return "-";
  let date: Date;
  if (typeof originalDate === typeof 1) {
    date = new Date(originalDate);
  } else {
    date = originalDate as Date;
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export { formatDateToDateMonthYear };
