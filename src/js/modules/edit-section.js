const initEditSection = () => {
  const screen = document.querySelector('[data-screen="5"]');
  if (!screen) {
    return;
  }

  const saveButton = document.querySelector('[data-save].button-navigation--save');
  const allSections = screen.querySelectorAll('.quiz__top > .section5');
  const mainSection = Array.from(allSections).find((section) => !section.hasAttribute('data-inputs-edit-client') && !section.hasAttribute('data-inputs-edit-order'));
  const clientInputs = screen.querySelector('[data-inputs-edit-client]');
  const orderInputs = screen.querySelector('[data-inputs-edit-order]');

  if (!mainSection || !saveButton || !clientInputs || !orderInputs) {
    return;
  }

  clientInputs.classList.add('hidden');
  orderInputs.classList.add('hidden');

  const showEditMode = (type) => {
    mainSection.classList.add('hidden');
    saveButton.classList.add('is-visible');

    if (type === 'client') {
      clientInputs.classList.remove('hidden');
    } else if (type === 'order') {
      orderInputs.classList.remove('hidden');
    }
  };

  const showViewMode = () => {
    mainSection.classList.remove('hidden');
    saveButton.classList.remove('is-visible');
    clientInputs.classList.add('hidden');
    orderInputs.classList.add('hidden');
  };

  const resetEditMode = () => {
    showViewMode();
  };

  screen.addEventListener('click', (evt) => {
    const button = evt.target.closest('[data-edit-client], [data-edit-order]');
    if (!button) return;

    evt.preventDefault();

    if (button.hasAttribute('data-edit-client')) {
      showEditMode('client');
    } else if (button.hasAttribute('data-edit-order')) {
      showEditMode('order');
    }
  });

  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    showViewMode();
  });

  document.addEventListener('quiz-step-changed', (e) => {
    const { step } = e.detail;
    if (step !== 5) {
      resetEditMode();
    }
  });
};

export { initEditSection };
