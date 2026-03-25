import Choices from 'choices.js';

const initChoices = () => {
  const timeZone = document.querySelector('[data-choice-time-zone]');
  if (timeZone) {
    new Choices(timeZone, {
      searchEnabled: false,
      itemSelectText: '',
    });
  }

  const timeDelivery = document.querySelector('[data-choice-time-delivery]');
  if (timeDelivery) {
    new Choices(timeDelivery, {
      searchEnabled: false,
      itemSelectText: '',
      classNames: {
        containerOuter: ['choices', 'choice-time-delivery'],
      },
    });
  }
};

export { initChoices };
