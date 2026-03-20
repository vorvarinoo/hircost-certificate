import { initSlider } from './utils.js';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { sliderConfig } from './configs.js';

window.swiperInstances = window.swiperInstances || {};

const initSliders = () => {
  const mainSlider = initSlider('.main-first', sliderConfig);
  if (mainSlider) {
    window.swiperInstances['main-first'] = mainSlider;
  }

  const certificateDesignSlider = initSlider(
    '[data-slider-image]',
    Object.assign(sliderConfig.default, {
      modules: [EffectCoverflow, Navigation],
      on: {
        progress: function () {
          this.slides.forEach((slide) => {
            const progress = Math.abs(slide.progress);
            const img = slide.querySelector(
              '.create-design__img:not(.create-design__img--preview)',
            );
            const previewImg = slide.querySelector(
              '.create-design__img--preview',
            );

            if (img) img.style.opacity = progress;
            if (previewImg) previewImg.style.opacity = 1 - progress;
          });
        },
      },
    }),
  );

  if (certificateDesignSlider) {
    window.swiperInstances['certificate-design'] = certificateDesignSlider;
    certificateDesignSlider.update();
  }
};

export { initSliders };
