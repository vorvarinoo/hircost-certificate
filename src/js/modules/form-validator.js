const validateSingleForm = (form) => {
  const errorBlock = form.querySelector('[data-form-error]');
  if (!errorBlock) return true;

  const nameInput = form.querySelector('input[id*="name-"]');
  const phoneInput = form.querySelector('input[id*="phone-"]');

  const nameValue = nameInput?.value.trim() || '';
  const phoneValue = phoneInput?.value.trim() || '';
  const phoneDigits = phoneValue.replace(/\D/g, '');

  const isValid = nameValue.length > 0 && phoneDigits.length === 11;

  if (isValid) {
    errorBlock.classList.add('hidden');
    nameInput?.closest('.input')?.classList.remove('_error');
    phoneInput?.closest('.input')?.classList.remove('_error');
  } else {
    errorBlock.classList.remove('hidden');

    if (nameValue.length === 0) {
      nameInput?.closest('.input')?.classList.add('_error');
    } else {
      nameInput?.closest('.input')?.classList.remove('_error');
    }

    if (phoneDigits.length !== 11) {
      phoneInput?.closest('.input')?.classList.add('_error');
    } else {
      phoneInput?.closest('.input')?.classList.remove('_error');
    }
  }

  return isValid;
};

const initFormValidator = () => {
  const forms = document.querySelectorAll('[data-form-self], [data-form-recipient]');

  forms.forEach((form) => {
    const errorBlock = form.querySelector('[data-form-error]');
    if (!errorBlock) return;

    const nameInput = form.querySelector('input[id*="name-"]');
    const phoneInput = form.querySelector('input[id*="phone-"]');

    const validateForm = () => {
      validateSingleForm(form);
    };

    if (nameInput) nameInput.addEventListener('blur', validateForm);
    if (phoneInput) phoneInput.addEventListener('blur', validateForm);
  });
};

export { initFormValidator, validateSingleForm };
