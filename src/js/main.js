import './modules/libsCss.js';
import 'focus-visible';

// Инициализируем certificate-renderer для прокидывания цвета и картинки
import './modules/certificate-renderer.js';

import { initSiteSettings } from './modules/settings.js';

import { initModals } from './modules/modal.js';
import { initSliders } from './modules/slider.js';
import { initColorsScroll } from './modules/colors-scroll.js';
import { validateForms } from './modules/validate.js';
import { initQuiz } from './modules/quiz.js';
import { initGetCertificateScreens } from './modules/quiz-get-certificate.js';
import { initTabs } from './modules/tabs.js';
import { initEditSection } from './modules/edit-section.js';
import { initPriceLineDrag } from './modules/price-line-drag.js';
import { initCertificatePrice } from './modules/certificate-price.js';
import { initChoices } from './modules/choices.js';
import { initEnvelope } from './modules/envelope.js';

document.addEventListener('DOMContentLoaded', () => {
  initSiteSettings();

  window.addEventListener('load', () => {
    validateForms();
    initModals();
    initSliders();
    initColorsScroll();
    initQuiz();
    initGetCertificateScreens();
    initTabs();
    initEditSection();
    initPriceLineDrag();
    initCertificatePrice();
    initChoices();
    initEnvelope();
  });
});
