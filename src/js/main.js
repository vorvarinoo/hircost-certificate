import './modules/libsCss.js';
import 'focus-visible';

// Инициализируем certificate-renderer для прокидывания цвета и картинки
import './modules/certificate-renderer.js';

import { initSiteSettings } from './modules/settings.js';

import { initModals } from './modules/modal.js';
import { initSliders } from './modules/slider.js';
import { initColorsScroll } from './modules/colors-scroll.js';
import { initPriceScroll } from './modules/price-scroll.js';
import { validateForms } from './modules/validate.js';
import { initQuiz } from './modules/quiz.js';
import { initGetCertificateScreens } from './modules/quiz-get-certificate.js';
import { initTabs } from './modules/tabs.js';
import { initPriceLineDrag } from './modules/price-line-drag.js';
import { initCertificatePrice } from './modules/certificate-price.js';
import { initPriceSync } from './modules/price-sync.js';
import { initChoices } from './modules/choices.js';
import { initEnvelope } from './modules/envelope.js';
import { initFormValidator } from './modules/form-validator.js';
import { initDeliveryNote } from './modules/delivery-note.js';
import { initRecipientData } from './modules/recipient-data.js';
import { initDeliveryTodayDate } from './modules/delivery-today-date.js';
import { initDeliveryData } from './modules/delivery-data.js';
import './modules/input.js';

document.addEventListener('DOMContentLoaded', () => {
  initSiteSettings();

  window.addEventListener('load', () => {
    validateForms();
    initModals();
    initSliders();
    initColorsScroll();
    initPriceScroll();
    initQuiz();
    initGetCertificateScreens();
    initTabs();
    initPriceLineDrag();
    initCertificatePrice();
    initPriceSync();
    initChoices();
    initEnvelope();
    initFormValidator();
    initDeliveryNote();
    initRecipientData();
    initDeliveryTodayDate();
    initDeliveryData();
  });
});
