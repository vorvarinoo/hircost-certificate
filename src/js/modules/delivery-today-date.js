const initDeliveryTodayDate = () => {
  const dateElements = document.querySelectorAll('[data-delivery-today]');

  console.log('initDeliveryTodayDate: found', dateElements.length, 'elements');

  if (!dateElements.length) return;

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const today = new Date();
  const day = today.getDate();
  const month = months[today.getMonth()];
  const newDate = `${day} ${month}`;

  console.log('initDeliveryTodayDate: setting date to', newDate);

  dateElements.forEach((element) => {
    element.textContent = newDate;
  });
};

export { initDeliveryTodayDate };
