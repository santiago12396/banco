export const getDateNextYear = (date: Date): Date => {
  const dateNextYear = new Date(date);
  dateNextYear.setFullYear(dateNextYear.getFullYear() + 1);
  return dateNextYear;
}

export const formatDateCurrent = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getDateNextYearFromString = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const dateNextYear = getDateNextYear(date);
  return formatDateCurrent(dateNextYear);
}




