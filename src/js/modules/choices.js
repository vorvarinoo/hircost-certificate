import Choices from 'choices.js';

const initChoices = () => {
  const timeZone = document.querySelector('[data-choice-time-zone]');
  const timeDelivery = document.querySelector('[data-choice-time-delivery]');
  new Choices(timeZone, {
    searchEnabled: false,
    itemSelectText: '',
  });

  new Choices(timeDelivery, {
    searchEnabled: false,
    itemSelectText: '',
    classNames: {
      containerOuter: ['choices', 'choice-time-delivery'],
    },
  });
};

export { initChoices };
