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
  e.preventDefault();

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

const centerSelectedPriceOnMobile = () => {
  const isMobile = window.matchMedia('(max-width: 1023.98px)').matches;
  if (!isMobile) return;

  const priceLine = document.querySelector('.price-line');
  const checkedInput = document.querySelector('input[name="price-certificate"]:checked');

  if (!priceLine || !checkedInput) return;

  const item = checkedInput.closest('.price-line__item');
  if (!item) return;

  const computedStyle = window.getComputedStyle(priceLine);
  const paddingLeft = parseFloat(computedStyle.paddingLeft);

  const itemLeft = item.offsetLeft;
  const itemWidth = item.offsetWidth;
  const containerWidth = priceLine.clientWidth;

  const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2) + paddingLeft;

  priceLine.scrollTo({
    left: scrollPosition,
    top: 0,
    behavior: 'auto'
  });
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

  document.addEventListener('quiz-step-changed', (e) => {
    if (e.detail.step === 2) {
      centerSelectedPriceOnMobile();
    }
  });
};

export { initCertificatePrice, applyPrice, rollbackPrice, prepareForEdit };
