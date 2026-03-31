import Choices from 'choices.js';

const initChoices = () => {
  const timeZones = document.querySelectorAll('[data-choice-time-zone]');
  timeZones.forEach((timeZone) => {
    new Choices(timeZone, {
      searchEnabled: false,
      itemSelectText: '',
    });
  });

  const timeDeliveries = document.querySelectorAll('[data-choice-time-delivery]');
  timeDeliveries.forEach((timeDelivery) => {
    new Choices(timeDelivery, {
      searchEnabled: false,
      itemSelectText: '',
      classNames: {
        containerOuter: ['choices', 'choice-time-delivery'],
      },
    });
  });
};

export { initChoices };
