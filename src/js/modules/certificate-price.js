import certificateState from './state.js';

let tempPrice = null;
let savedPrice = null;

const isEditMode = () => {
  const editBlock = document.querySelector('[data-delivery-edit]');
  return editBlock && !editBlock.classList.contains('hidden');
};

const updatePriceDisplay = (value) => {
  const priceDisplay = document.querySelector('[data-certificate-price]');
  if (!priceDisplay) return;
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  priceDisplay.textContent = formattedPrice;
};

const handlePriceChange = (e) => {
  const value = e.target.value;

  if (isEditMode()) {
    tempPrice = value;
    updatePriceDisplay(value);
  } else {
    certificateState.set('price', value);
    updatePriceDisplay(value);
  }
};

const applyPrice = () => {
  if (tempPrice !== null) {
    certificateState.set('price', tempPrice);
    tempPrice = null;
    savedPrice = null;
  }
};

const prepareForEdit = () => {
  savedPrice = certificateState.getByKey('price');
  tempPrice = null;
};

const rollbackPrice = () => {
  if (savedPrice !== null) {
    const priceInputs = document.querySelectorAll('input[name="price-certificate"]');
    priceInputs.forEach((input) => {
      if (input.value === savedPrice) {
        input.checked = true;
      }
    });
    updatePriceDisplay(savedPrice);
    tempPrice = null;
    savedPrice = null;
  }
};

const initCertificatePrice = () => {
  const priceInputs = document.querySelectorAll('input[name="price-certificate"]');

  if (priceInputs.length === 0) return;

  priceInputs.forEach((input) => {
    input.addEventListener('change', handlePriceChange);
  });

  const checkedInput = document.querySelector('input[name="price-certificate"]:checked');
  if (checkedInput) {
    const value = checkedInput.value;
    certificateState.set('price', value);
    updatePriceDisplay(value);
  }
};

export { initCertificatePrice, applyPrice, rollbackPrice, prepareForEdit };
