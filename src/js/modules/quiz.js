import certificateState from './state.js';

const screens = document.querySelectorAll('.quiz__screen.screen');
const steps = document.querySelectorAll('.timeline__step');

let currentStep = 1;
const totalSteps = screens.length;

const screenItems = Array.from(screens, (screen) => ({
  el: screen,
  num: Number(screen.dataset.screen),
}));

const stepItems = Array.from(steps, (stepEl) => ({
  el: stepEl,
  num: Number(stepEl.dataset.step),
}));

const updateUI = (step) => {
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
  if (nextButton) {
    if (step >= 5) {
      nextButton.classList.add('hidden');
    } else {
      nextButton.classList.remove('hidden');
    }
  }

  document.dispatchEvent(new CustomEvent('quiz-step-changed', { detail: { step } }));
};

const goToStep = (step) => {
  if (step < 1 || step > totalSteps) return;
  currentStep = step;
  updateUI(currentStep);
};

const initQuiz = () => {
  document.querySelector('.timeline__nav').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const step = parseInt(btn.closest('.timeline__step').dataset.step);
    goToStep(step);
  });

  document.querySelector('.quiz').addEventListener('click', (e) => {
    if (e.target.matches('[data-next]')) {
      goToStep(currentStep + 1);
    } else if (e.target.matches('[data-prev]')) {
      goToStep(currentStep - 1);
    }
  });

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