const initColorsScroll = () => {
  const colorsContainer = document.querySelector('.colors');
  const prevBtn = document.querySelector('[data-scroll-colors="prev"]');
  const nextBtn = document.querySelector('[data-scroll-colors="next"]');

  if (!colorsContainer || !prevBtn || !nextBtn) return;

  const SCROLL_AMOUNT = 60;

  const updateButtonsState = () => {
    const isAtStart = colorsContainer.scrollLeft <= 0;
    const isAtEnd = Math.ceil(colorsContainer.scrollLeft + colorsContainer.clientWidth) >= colorsContainer.scrollWidth - 2;

    prevBtn.style.opacity = isAtStart ? '0.3' : '1';
    prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

    nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
    nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
  };

  prevBtn.addEventListener('click', () => {
    colorsContainer.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  });

  nextBtn.addEventListener('click', () => {
    colorsContainer.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  });

  colorsContainer.addEventListener('scroll', updateButtonsState);

  setTimeout(updateButtonsState, 100);
};

export { initColorsScroll };
