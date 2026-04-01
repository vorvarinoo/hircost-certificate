const initDeliveryNote = () => {
  const timeSelects = document.querySelectorAll('[data-choice-time-delivery]');

  timeSelects.forEach((timeSelect) => {
    const formContainer = timeSelect.closest('[date-form-delivery]');
    const noteElement = formContainer?.querySelector('[data-delivery-note]');

    if (!noteElement) return;

    const updateNote = () => {
      const selectedValue = timeSelect.value;

      if (selectedValue === '00:00') {
        noteElement.classList.remove('hidden');
      } else {
        noteElement.classList.add('hidden');
      }
    };

    updateNote();

    timeSelect.addEventListener('change', updateNote);
  });
};

export { initDeliveryNote };
