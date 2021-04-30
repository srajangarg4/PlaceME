export * from './theme';
export * from './propTypes';
export * from './httpUtils';
export * from './validator';
export { default as Routes } from './routes';
export { default as messages } from './messages';
export { default as Roles } from './roles';

export const getCurrentDate = (/** @type {string} */ format) => {
  let formattedDate = format;
  const date = new Date();

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

export const BookingStatus = Object.freeze({
  0: 'Confirmed',
  1: 'Pending',
  2: 'Cancelled',
});

export const getBookingStatus = (status) => BookingStatus[status];

const images = [
  'https://i.ndtvimg.com/i/2015-12/mercedes-benz-bus-827_827x510_61450773888.jpg',
  'http://www.dubaibusrentals.com/images/vehicles/5.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOk3yGpJUJPrSxONQIO8d6s6LlTYbiligFww&usqp=CAU',
  'https://images.moneycontrol.com/static-mcnews/2018/06/mercedes-770x433.jpg?impolicy=website&width=770&height=431',
];

export const getRandomBusImage = () => {
  const randomElement = images[Math.floor(Math.random() * images.length)];
  return randomElement;
};
