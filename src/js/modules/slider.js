import { initSlider } from './utils.js';
import { EffectCoverflow } from 'swiper/modules';
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
      modules: [EffectCoverflow],
    }),
  );

  if (certificateDesignSlider) {
    window.swiperInstances['certificate-design'] = certificateDesignSlider;
  }
};

export { initSliders };
