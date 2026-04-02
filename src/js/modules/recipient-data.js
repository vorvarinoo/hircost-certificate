import certificateState from './state.js';

let currentTab = 'self';

const getActiveTab = () => {
  const selfTab = document.querySelector('[data-jtabs="recipient-contacts"]');
  const editTab = document.querySelector('[data-jtabs="recipient-edit-contacts"]');

  if (!selfTab && !editTab) return null;

  const activeTab = selfTab || editTab;
  if (!activeTab) return null;

  const panels = activeTab.querySelectorAll('[data-jtabs="panel"]');
  if (panels.length === 0) return null;

  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    const isHidden = panel.classList.contains('hidden') || panel.style.display === 'none' || panel.offsetParent === null;

    if (!isHidden) {
      const formSelf = panel.querySelector('[data-form-self]');
      if (formSelf) return 'self';

      const formRecipient = panel.querySelector('[data-form-recipient]');
      if (formRecipient) return 'other';
    }
  }

  return 'self';
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

  certificateState.set('recipient.type', data.type);
  certificateState.set('recipient.name', data.name);
  certificateState.set('recipient.phone', data.phone);
  certificateState.set('recipient.wishes', data.wishes);
  certificateState.set('recipient.from', data.from);
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

const observeTabChanges = () => {
  const selfTab = document.querySelector('[data-jtabs="recipient-contacts"]');
  const editTab = document.querySelector('[data-jtabs="recipient-edit-contacts"]');

  const observer = new MutationObserver(() => {
    const newTab = getActiveTab();
    if (newTab && newTab !== currentTab) {
      currentTab = newTab;
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
  observeTabChanges();

  document.addEventListener('quiz-step-changed', (e) => {
    if (e.detail.step === 5) {
      updateSection5Display();
    }
  });

  certificateState.addEventListener('change', () => {
    updateSection5Display();
  });
};

export { initRecipientData, saveRecipientData, getRecipientData, updateSection5Display };
