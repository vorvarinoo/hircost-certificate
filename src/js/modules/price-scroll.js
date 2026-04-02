const initPriceScroll = () => {
  const priceLine = document.querySelector('.price-line');
  const prevBtn = document.querySelector('[data-scroll-price="prev"]');
  const nextBtn = document.querySelector('[data-scroll-price="next"]');

  if (!priceLine || !prevBtn || !nextBtn) return;

  const SCROLL_AMOUNT = 100;

  const updateButtonsState = () => {
    const isAtStart = priceLine.scrollLeft <= 0;
    const isAtEnd = Math.ceil(priceLine.scrollLeft + priceLine.clientWidth) >= priceLine.scrollWidth - 10;

    prevBtn.style.opacity = isAtStart ? '0.3' : '1';
    prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

    nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
    nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
  };

  prevBtn.addEventListener('click', () => {
    priceLine.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  });

  nextBtn.addEventListener('click', () => {
    priceLine.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  });

  priceLine.addEventListener('scrollend', updateButtonsState);
  priceLine.addEventListener('scroll', updateButtonsState);

  setTimeout(updateButtonsState, 100);
};

export { initPriceScroll };
