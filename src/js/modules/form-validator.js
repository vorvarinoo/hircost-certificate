const initFormValidator = () => {
  const forms = document.querySelectorAll('[data-form-self], [data-form-recipient]');

  forms.forEach((form) => {
    const errorBlock = form.querySelector('[data-form-error]');
    if (!errorBlock) return;

    const nameInput = form.querySelector('input[id*="name-"]');
    const phoneInput = form.querySelector('input[id*="phone-"]');

    const validateForm = () => {
      const nameValue = nameInput?.value.trim() || '';
      const phoneValue = phoneInput?.value.trim() || '';

      const isValid = nameValue.length > 0 && phoneValue.length > 0;

      if (isValid) {
        errorBlock.classList.add('hidden');
      } else {
        errorBlock.classList.remove('hidden');
      }
    };

    if (nameInput) nameInput.addEventListener('blur', validateForm);
    if (phoneInput) phoneInput.addEventListener('blur', validateForm);
  });
};

export { initFormValidator };
