import { initSlider } from './utils.js';
import { EffectCoverflow } from 'swiper';
import { sliderConfig } from './configs.js';

window.swiperInstances = window.swiperInstances || {};

const bindExternalControls = (swiper, sliderId) => {
  if (!swiper || !sliderId) return;

  document
    .querySelectorAll(`[data-to-slide="prev"][data-slider="${sliderId}"]`)
    .forEach((btn) => {
      btn.addEventListener('click', () => swiper.slidePrev());
    });

  document
    .querySelectorAll(`[data-to-slide="next"][data-slider="${sliderId}"]`)
    .forEach((btn) => {
      btn.addEventListener('click', () => swiper.slideNext());
    });
};

const initSliders = () => {
  const mainSlider = initSlider('.main-first', {
    ...sliderConfig,
  });

  if (mainSlider) {
    window.swiperInstances['main-first'] = mainSlider;
    bindExternalControls(mainSlider, 'main-first');
  }

  const certificateDesignSlider = initSlider('[data-slider-image]', {
    ...sliderConfig.default,
    modules: [EffectCoverflow],
    on: {
      progress() {
        this.slides.forEach((slide) => {
          const progress = Math.abs(slide.progress);
          const img = slide.querySelector(
            '.create-design__img:not(.create-design__img--detail)',
          );
          const previewImg = slide.querySelector('.create-design__img--detail');

          if (img) img.style.opacity = progress;
          if (previewImg) previewImg.style.opacity = 1 - progress;
        });
      },
    },
  });

  if (certificateDesignSlider) {
    window.swiperInstances['certificate-design'] = certificateDesignSlider;
    bindExternalControls(certificateDesignSlider, 'certificate-design');
    certificateDesignSlider.update();
  }
};

export { initSliders };
