const initPriceLineDrag = () => {
  const priceLines = document.querySelectorAll('.price-line');

  priceLines.forEach((priceLine) => {
    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - priceLine.offsetLeft;
      scrollLeft = priceLine.scrollLeft;
      priceLine.classList.add('price-line--grabbing');
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const x = e.pageX - priceLine.offsetLeft;
      const walk = (x - startX) * 1.5;
      priceLine.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      isDragging = false;
      priceLine.classList.remove('price-line--grabbing');
    };

    const handleTouchStart = (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - priceLine.offsetLeft;
      scrollLeft = priceLine.scrollLeft;
      priceLine.classList.add('price-line--grabbing');
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;

      const x = e.touches[0].pageX - priceLine.offsetLeft;
      const walk = (x - startX) * 1.5;
      priceLine.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isDragging = false;
      priceLine.classList.remove('price-line--grabbing');
    };

    const handleKeyDown = (e) => {
      const scrollAmount = 100;

      if (e.key === 'ArrowLeft') {
        priceLine.scrollLeft -= scrollAmount;
      } else if (e.key === 'ArrowRight') {
        priceLine.scrollLeft += scrollAmount;
      }
    };

    priceLine.addEventListener('mousedown', handleMouseDown);
    priceLine.addEventListener('mousemove', handleMouseMove);
    priceLine.addEventListener('mouseup', handleMouseUp);
    priceLine.addEventListener('mouseleave', handleMouseUp);

    priceLine.addEventListener('touchstart', handleTouchStart);
    priceLine.addEventListener('touchmove', handleTouchMove);
    priceLine.addEventListener('touchend', handleTouchEnd);

    priceLine.addEventListener('keydown', handleKeyDown);
  });
};

export { initPriceLineDrag };
