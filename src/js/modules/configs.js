const sliderConfig = {
  default: {
    spaceBetween: 30,
    watchSlidesProgress: true,
    navigation: {
      prevEl: '[data-to-slide="prev"]',
      nextEl: '[data-to-slide="next"]',
    },
    loop: true,
    effect: 'coverflow',
    slidesPerView: 3,
    centeredSlides: true,
    grabCursor: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 10,
      depth: 200,
      modifier: 1.5,
      slideShadows: false,
    },
  },
};

const smoothScrollConfig = {
  speed: 900,
  speedAsDuration: true,
  updateURL: false,
};

const modalConfig = {
  linkAttributeName: false,
  catchFocus: true,
  closeOnEsc: true,
  backscroll: true,
};

const validateConfig = {
  justValidate: {
    errorFieldCssClass: 'is-invalid',
    errorLabelCssClass: 'error-massage',
    errorLabelStyle: {
      color: 'var(--error)',
      marginTop: '6px',
      fontSize: '12px',
      textAlign: 'left',
    },
    errorFormClass: 'shaked',
    errorTimeout: 1500,
  },
  errorTimeout: 1500,
  mask: {
    bodyMask: ' (___) ___ __ __',
  },
};

const observerConfig = {
  scrollTop: {
    rootMargin: '600px',
    threshold: 1,
  },
};

export {
  sliderConfig,
  smoothScrollConfig,
  modalConfig,
  validateConfig,
  observerConfig,
};

// todo
