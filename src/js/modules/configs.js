const sliderConfig = {
  default: {
    watchSlidesProgress: true,
    loop: true,
    effect: 'coverflow',
    slidesPerView: 'auto',
    centeredSlides: true,
    grabCursor: true,
    speed: 500,
    breakpoints: {
      320: {
        spaceBetween: 70,
        coverflowEffect: {
          rotate: 0,
          stretch: 10,
          depth: 300,
          modifier: 1.5,
          slideShadows: false,
        },
      },
      1024: {
        spaceBetween: 40,
        coverflowEffect: {
          depth: 200,
          rotate: 0,
          stretch: 10,
          modifier: 1.5,
          slideShadows: false,
        },
      },
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
