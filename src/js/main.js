import './modules/libsCss.js';
import 'focus-visible';

import { initSiteSettings } from './modules/settings.js';

import { initModals } from './modules/modal.js';
import { initSliders } from './modules/slider.js';
import { validateForms } from './modules/validate.js';
import { initQuiz } from './modules/quiz.js';

document.addEventListener('DOMContentLoaded', () => {
  initSiteSettings();
  initQuiz();

  window.addEventListener('load', () => {
    validateForms();
    initModals();
    initSliders();
  });
});
