import certificateState from './state.js';
import { prepareForEdit, applyPrice, rollbackPrice } from './certificate-price.js';

const screens = document.querySelectorAll('.quiz__screen.screen');
const steps = document.querySelectorAll('.timeline__step');

let currentStep = 1;
const totalSteps = screens.length;
let returnToStep = null;
let isInEditMode = false;

const screenItems = Array.from(screens, (screen) => {
  const screenNum = screen.dataset.screen;
  if (!screenNum) return null; // Пропускаем экраны без data-screen (get-certificate)
  return {
    el: screen,
    num: Number(screenNum),
  };
}).filter((item) => item !== null);

const stepItems = Array.from(steps, (stepEl) => ({
  el: stepEl,
  num: Number(stepEl.dataset.step),
}));

const updateUI = (step, editMode = false) => {
  isInEditMode = editMode;
  const activeStep = step;

  for (let i = 0; i < screenItems.length; i += 1) {
    const screenItem = screenItems[i];
    const isActive = screenItem.num === activeStep;
    screenItem.el.classList.toggle('isActive', isActive);
    screenItem.el.hidden = !isActive;
  }

  for (let i = 0; i < stepItems.length; i += 1) {
    const stepItem = stepItems[i];
    stepItem.el.classList.toggle('isActive', stepItem.num === activeStep);
    stepItem.el.classList.toggle('completed', stepItem.num < activeStep);
  }

  if (step >= 2) {
    document.documentElement.style.setProperty('--body-background', '#f3f2ff');
  } else {
    document.documentElement.style.setProperty('--body-background', '#ffffff');
  }

  const nextButton = document.querySelector('[data-next]');
  const saveButton = document.querySelector('[data-save]');

  if (editMode) {
    if (nextButton) nextButton.classList.add('hidden');
    if (saveButton) saveButton.classList.add('is-visible');
  } else {
    if (nextButton) {
      if (step >= 5) {
        nextButton.classList.add('hidden');
      } else {
        nextButton.classList.remove('hidden');
      }
    }
    if (saveButton) saveButton.classList.remove('is-visible');
  }

  const headerTitle = document.querySelector('[data-header-title]');
  if (headerTitle) {
    const titles = {
      1: 'Выберите дизайн',
      2: 'Выберите номинал',
      3: 'Кому дарим',
      4: 'Когда отправить',
      5: 'Проверьте, всё ли верно',
    };
    headerTitle.textContent = titles[step] || '';
  }

  document.dispatchEvent(new CustomEvent('quiz-step-changed', { detail: { step } }));
};

const goToStep = (step, options = {}) => {
  if (step < 1 || step > totalSteps) return;
  currentStep = step;

  if (step === 3) {
    const viewBlock = document.querySelector('[data-recipient-view]');
    const editBlock = document.querySelector('[data-recipient-edit]');
    if (viewBlock && editBlock) {
      const isEdit = options.editMode ?? false;
      viewBlock.classList.toggle('hidden', isEdit);
      editBlock.classList.toggle('hidden', !isEdit);
    }
  }

  if (step === 2) {
    const viewBlock = document.querySelector('[data-delivery-view]');
    const editBlock = document.querySelector('[data-delivery-edit]');
    if (viewBlock && editBlock) {
      const isEdit = options.editMode ?? false;
      viewBlock.classList.toggle('hidden', isEdit);
      editBlock.classList.toggle('hidden', !isEdit);
      if (isEdit) {
        prepareForEdit();
      }
    }
  }

  if (step === 4) {
    const viewBlock = document.querySelector('[data-delivery-view]');
    const editBlock = document.querySelector('[data-delivery-edit]');
    if (viewBlock && editBlock) {
      const isEdit = options.editMode ?? false;
      viewBlock.classList.toggle('hidden', isEdit);
      editBlock.classList.toggle('hidden', !isEdit);
    }
  }

  if (options.editMode) {
    returnToStep = currentStep;
  }

  updateUI(currentStep, options.editMode);
};

const initQuiz = () => {
  // Проверяем что это страница quiz (есть timeline)
  const hasTimeline = document.querySelector('.timeline__step');
  if (!hasTimeline) return; // Выходим если это get-certificate страница

  const timelineNav = document.querySelector('.timeline__nav');
  if (timelineNav) {
    timelineNav.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const step = parseInt(btn.closest('.timeline__step').dataset.step);
      goToStep(step);
    });
  }

  const quizContainer = document.querySelector('.quiz');
  if (quizContainer) {
    quizContainer.addEventListener('click', (e) => {
      if (e.target.matches('[data-edit-client]')) {
        goToStep(3, { editMode: true });
      } else if (e.target.matches('[data-edit-order]')) {
        goToStep(2, { editMode: true });
      } else if (e.target.matches('[data-next]')) {
        goToStep(currentStep + 1);
      } else if (e.target.matches('[data-prev]')) {
        if (isInEditMode) {
          rollbackPrice();
          goToStep(returnToStep || 5, { editMode: false });
        } else {
          goToStep(currentStep - 1);
        }
      } else if (e.target.matches('[data-save]')) {
        applyPrice();
        goToStep(returnToStep || 5, { editMode: false });
      }
    });
  }

  // Отслеживание выбора цвета - сохраняем в state
  document.addEventListener('change', (e) => {
    const input = e.target;
    if (!input.matches('input[name="color-picker"]')) return;

    const label = input.closest('.input-color-picker');
    const swatch = label?.querySelector('.input-color-picker__color');
    const swatchColor =
      swatch?.style.getPropertyValue('--input-color') ||
      getComputedStyle(swatch || input).getPropertyValue('--input-color');
    const color = swatchColor?.trim() || input.dataset.color;
    if (!color) return;

    // Сохраняем цвет в state вместо прямого изменения DOM
    certificateState.set('color', color);
  });

  // Инициализация дизайна из swiper
  const initDesignTracking = () => {
    const designSlider = window.swiperInstances?.['certificate-design'];
    if (!designSlider) return;

    const updateDesignFromSlider = () => {
      const activeSlide = designSlider.slides[designSlider.activeIndex];
      const img = activeSlide?.querySelector('img');
      const imageSrc = img?.src || '';
      if (imageSrc) {
        certificateState.set('design.image', imageSrc);
      }
    };

    designSlider.on('slideChange', updateDesignFromSlider);
    updateDesignFromSlider();
  };

  // Инициализация цвета по умолчанию
  const initDefaultColor = () => {
    const defaultColorInput = document.querySelector('input[name="color-picker"]:checked');
    if (!defaultColorInput) return;

    const label = defaultColorInput.closest('.input-color-picker');
    const swatch = label?.querySelector('.input-color-picker__color');
    const swatchColor =
      swatch?.style.getPropertyValue('--input-color') ||
      getComputedStyle(swatch || defaultColorInput).getPropertyValue('--input-color');
    const color = swatchColor?.trim() || defaultColorInput.dataset.color;

    if (color) {
      certificateState.set('color', color);
    }
  };

  updateUI(1);

  // Инициализируем после загрузки
  setTimeout(() => {
    initDesignTracking();
    initDefaultColor();
  }, 200);
};

export { initQuiz };