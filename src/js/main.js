import './modules/libsCss.js';
import 'focus-visible';

// Инициализируем certificate-renderer для прокидывания цвета и картинки
import './modules/certificate-renderer.js';

import { initSiteSettings } from './modules/settings.js';

import { initModals } from './modules/modal.js';
import { initSliders } from './modules/slider.js';
import { validateForms } from './modules/validate.js';
import { initQuiz } from './modules/quiz.js';
import { initTabs } from './modules/tabs.js';
import { initPriceLineDrag } from './modules/price-line-drag.js';

document.addEventListener('DOMContentLoaded', () => {
  initSiteSettings();

  window.addEventListener('load', () => {
    validateForms();
    initModals();
    initSliders();
    initQuiz();
    initTabs();
    initPriceLineDrag();
  });
});
