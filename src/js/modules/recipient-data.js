import certificateState from './state.js';

let currentTab = 'self';
let tempRecipientData = null;
let savedRecipientData = null;

const isEditMode = () => {
  const editBlock = document.querySelector('[data-recipient-edit]');
  return editBlock && !editBlock.classList.contains('hidden');
};

const getActiveTab = () => {
  const selfTab = document.querySelector('[data-jtabs="recipient-contacts"]');
  const editTab = document.querySelector('[data-jtabs="recipient-edit-contacts"]');

  if (!selfTab && !editTab) return null;

  const activeTab = selfTab || editTab;
  if (!activeTab) return null;

  const activeButton = activeTab.querySelector('[data-jtabs="control"].is-active');
  if (!activeButton) return 'self';

  const buttonText = activeButton.textContent.trim().toLowerCase();
  return buttonText === 'другому' ? 'other' : 'self';
};

const getRecipientData = () => {
  const tab = getActiveTab();
  if (!tab) return null;

  if (tab === 'self') {
    const nameInput = document.getElementById('name-self');
    const phoneInput = document.getElementById('phone-self');
    const wishesInput = document.getElementById('wishes-self');

    return {
      type: 'self',
      name: nameInput?.value || '',
      phone: phoneInput?.value || '',
      wishes: wishesInput?.value || '',
      from: ''
    };
  }

  const nameInput = document.getElementById('name-recipient');
  const phoneInput = document.getElementById('phone-recipient');
  const wishesInput = document.getElementById('wishes-recipient');
  const fromInput = document.getElementById('from-recipient');

  return {
    type: 'other',
    name: nameInput?.value || '',
    phone: phoneInput?.value || '',
    wishes: wishesInput?.value || '',
    from: fromInput?.value || ''
  };
};

const saveRecipientData = () => {
  const data = getRecipientData();
  if (!data) return;

  if (isEditMode()) {
    tempRecipientData = { ...data };
  } else {
    certificateState.set('recipient.type', data.type);
    certificateState.set('recipient.name', data.name);
    certificateState.set('recipient.phone', data.phone);
    certificateState.set('recipient.wishes', data.wishes);
    certificateState.set('recipient.from', data.from);
  }
};

const updateSection5Display = () => {
  const recipient = certificateState.getByKey('recipient');
  if (!recipient) return;

  const nameElement = document.querySelector('[data-recipient-name]');
  const phoneElement = document.querySelector('[data-recipient-phone]');
  const wishesElement = document.querySelector('[data-recipient-wishes]');

  if (nameElement) {
    nameElement.textContent = recipient.name || 'Не указано';
  }

  if (phoneElement) {
    phoneElement.textContent = recipient.phone || '';
  }

  if (wishesElement) {
    wishesElement.textContent = recipient.wishes || '';
  }
};

const handleInputChange = () => {
  saveRecipientData();
  updateSection5Display();
};

const observeTabChanges = () => {
  const selfTab = document.querySelector('[data-jtabs="recipient-contacts"]');
  const editTab = document.querySelector('[data-jtabs="recipient-edit-contacts"]');

  const observer = new MutationObserver(() => {
    const newTab = getActiveTab();
    if (newTab && newTab !== currentTab) {
      currentTab = newTab;
      handleInputChange();
    }
  });

  if (selfTab) {
    const buttons = selfTab.querySelectorAll('[data-jtabs="control"]');
    buttons.forEach((button) => {
      observer.observe(button, { attributes: true, attributeFilter: ['class'] });
    });
  }

  if (editTab) {
    const buttons = editTab.querySelectorAll('[data-jtabs="control"]');
    buttons.forEach((button) => {
      observer.observe(button, { attributes: true, attributeFilter: ['class'] });
    });
  }
};

const initRecipientData = () => {
  const inputs = [
    'name-self', 'phone-self', 'wishes-self',
    'name-recipient', 'phone-recipient', 'wishes-recipient', 'from-recipient'
  ];

  inputs.forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', handleInputChange);
      input.addEventListener('change', handleInputChange);
    }
  });

  observeTabChanges();

  document.addEventListener('quiz-step-changed', (e) => {
    if (e.detail.step === 5) {
      updateSection5Display();
    }
  });

  certificateState.addEventListener('change', () => {
    updateSection5Display();
  });

  const initialData = getRecipientData();
  if (initialData) {
    certificateState.set('recipient.type', initialData.type);
    certificateState.set('recipient.name', initialData.name);
    certificateState.set('recipient.phone', initialData.phone);
    certificateState.set('recipient.wishes', initialData.wishes);
    certificateState.set('recipient.from', initialData.from);
  }
};

const prepareForEditRecipient = () => {
  savedRecipientData = certificateState.getByKey('recipient');
  tempRecipientData = null;
};

const applyRecipientData = () => {
  if (tempRecipientData) {
    certificateState.set('recipient.type', tempRecipientData.type);
    certificateState.set('recipient.name', tempRecipientData.name);
    certificateState.set('recipient.phone', tempRecipientData.phone);
    certificateState.set('recipient.wishes', tempRecipientData.wishes);
    certificateState.set('recipient.from', tempRecipientData.from);
    tempRecipientData = null;
    savedRecipientData = null;
  }
};

const rollbackRecipientData = () => {
  if (savedRecipientData) {
    const inputs = [
      'name-self', 'phone-self', 'wishes-self',
      'name-recipient', 'phone-recipient', 'wishes-recipient', 'from-recipient'
    ];

    inputs.forEach((id) => {
      const input = document.getElementById(id);
      if (input) {
        input.value = '';
      }
    });

    if (savedRecipientData.type === 'self') {
      const nameInput = document.getElementById('name-self');
      const phoneInput = document.getElementById('phone-self');
      const wishesInput = document.getElementById('wishes-self');

      if (nameInput) nameInput.value = savedRecipientData.name || '';
      if (phoneInput) phoneInput.value = savedRecipientData.phone || '';
      if (wishesInput) wishesInput.value = savedRecipientData.wishes || '';
    } else {
      const nameInput = document.getElementById('name-recipient');
      const phoneInput = document.getElementById('phone-recipient');
      const wishesInput = document.getElementById('wishes-recipient');
      const fromInput = document.getElementById('from-recipient');

      if (nameInput) nameInput.value = savedRecipientData.name || '';
      if (phoneInput) phoneInput.value = savedRecipientData.phone || '';
      if (wishesInput) wishesInput.value = savedRecipientData.wishes || '';
      if (fromInput) fromInput.value = savedRecipientData.from || '';
    }

    tempRecipientData = null;
    savedRecipientData = null;
  }
};

export { initRecipientData, saveRecipientData, getRecipientData, prepareForEditRecipient, applyRecipientData, rollbackRecipientData };
