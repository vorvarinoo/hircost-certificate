import certificateState from './state.js';

const initCertificatePrice = () => {
  const priceDisplay = document.querySelector('[data-certificate-price]');
  const priceInputs = document.querySelectorAll('input[name="price-certificate"]');

  if (!priceDisplay || priceInputs.length === 0) return;

  const updatePrice = (value) => {
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
    priceDisplay.textContent = formattedPrice;
    certificateState.set('price', value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    updatePrice(value);
  };

  priceInputs.forEach((input) => {
    input.addEventListener('change', handlePriceChange);
  });

  const checkedInput = document.querySelector('input[name="price-certificate"]:checked');
  if (checkedInput) {
    updatePrice(checkedInput.value);
  }
};

export { initCertificatePrice };
