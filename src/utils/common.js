export const bloodGroups = [
  { text: 'A+', value: 'A+' },
  { text: 'A-', value: 'A-' },
  { text: 'B+', value: 'B+' },
  { text: 'B-', value: 'B-' },
  { text: 'O+', value: 'O+' },
  { text: 'O-', value: 'O-' },
  { text: 'AB+', value: 'AB+' },
  { text: 'AB-', value: 'AB-' },
];
export const resolveDate = (date) => new Date(date?.toDate());

export const getFormattedDate = (format, dateInput) => {
  let formattedDate = format;
  const date = new Date(dateInput);

  const currentYear = date.getFullYear();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth();
  formattedDate = formattedDate.replace(
    'dd',
    currentDate <= 9 ? `0${currentDate}` : `${currentDate}`,
  );
  formattedDate = formattedDate.replace(
    'mm',
    currentMonth <= 9 ? `0${currentMonth}` : `${currentMonth}`,
  );
  formattedDate = formattedDate.replace('yyyy', `${currentYear}`);
  return formattedDate;
};

const compareObjects = (tobeCompare, compareFrom) => {
  Object.keys(compareFrom);
};
