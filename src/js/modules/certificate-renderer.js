/**
 * Модуль рендеринга сертификата
 * Прокидывает цвет и изображение на элементы с data-атрибутами
 */
import certificateState from './state.js';

const renderConfig = [
  // Обновление цвета фона
  {
    selector: '[data-checked-background]',
    field: 'color',
    updater: (el, value) => {
      if (value) {
        el.style.setProperty('--checked-background-color', value);
      }
    },
  },
  // Обновление изображения
  {
    selector: '[data-certificate-image]',
    field: 'design.image',
    updater: (el, value) => {
      const imgEl = el.querySelector('img');
      if (imgEl && value) {
        imgEl.src = value;
      }
    },
  },
];

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

const render = (data) => {
  renderConfig.forEach((config) => {
    document.querySelectorAll(config.selector).forEach((el) => {
      const value = getNestedValue(data, config.field);
      if (value !== undefined && value !== null) {
        config.updater(el, value);
      }
    });
  });
};

certificateState.addEventListener('change', (e) => {
  render(e.detail);
});

render(certificateState.get());
