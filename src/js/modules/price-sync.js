import certificateState from './state.js';

const initPriceSync = () => {
  const priceElements = document.querySelectorAll('[data-certificate-price]');

  if (priceElements.length === 0) return;

  const formatPrice = (value) => {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  };

  const updateAllPrices = (price) => {
    const formattedPrice = formatPrice(price);
    priceElements.forEach((element) => {
      element.textContent = formattedPrice;
    });
  };

  certificateState.addEventListener('change', (e) => {
    const { price } = e.detail;
    if (price !== undefined) {
      updateAllPrices(price);
    }
  });

  const currentPrice = certificateState.getByKey('price');
  if (currentPrice) {
    updateAllPrices(currentPrice);
  }
};

export { initPriceSync };
