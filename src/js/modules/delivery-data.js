import certificateState from './state.js';

const getActiveDeliveryTab = () => {
  const deliveryDateTab = document.querySelector('[data-jtabs="delivery-date"]');
  const deliveryEditDateTab = document.querySelector('[data-jtabs="delivery-edit-date"]');

  if (!deliveryDateTab && !deliveryEditDateTab) return null;

  const activeTab = deliveryDateTab || deliveryEditDateTab;
  if (!activeTab) return null;

  const panels = activeTab.querySelectorAll('[data-jtabs="panel"]');
  if (panels.length === 0) return null;

  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    const isVisible = panel.classList.contains('is-visible');

    if (isVisible) {
      const todayPanel = panel.querySelector('.delivery-today');
      if (todayPanel) return 'today';

      const formPanel = panel.querySelector('[date-form-delivery]');
      if (formPanel) return 'custom';
    }
  }

  return 'today';
};

const formatDeliveryDate = (dateString, timeString) => {
  if (!dateString) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} в ${hours}:${minutes}`;
  }

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const time = timeString || '12:00';

  return `${day}.${month}.${year} в ${time}`;
};

const getDeliveryData = () => {
  const tabType = getActiveDeliveryTab();
  if (!tabType) return null;

  if (tabType === 'today') {
    return {
      type: 'today',
      date: '',
      time: '',
      formattedDate: formatDeliveryDate('', '')
    };
  }

  const dateInput = document.querySelector('.input-data-delivery__input[data-flatpickr-time-delivery]');
  const timeSelect = document.querySelector('select[data-choice-time-delivery]');

  let dateValue = '';
  if (dateInput && dateInput._flatpickr) {
    const fp = dateInput._flatpickr;
    if (fp.selectedDates && fp.selectedDates[0]) {
      dateValue = fp.formatDate(fp.selectedDates[0], 'Y-m-d');
    }
  }

  const timeValue = timeSelect?.value || '12:00';

  console.log('getDeliveryData: custom tab', { dateValue, timeValue });

  return {
    type: 'custom',
    date: dateValue,
    time: timeValue,
    formattedDate: formatDeliveryDate(dateValue, timeValue)
  };
};

const saveDeliveryData = () => {
  const data = getDeliveryData();
  if (!data) return;

  certificateState.set('delivery.type', data.type);
  certificateState.set('delivery.date', data.date);
  certificateState.set('delivery.time', data.time);
  certificateState.set('delivery.formattedDate', data.formattedDate);
};

const updateDeliveryDisplay = () => {
  const delivery = certificateState.getByKey('delivery');
  if (!delivery) return;

  const deliveryElement = document.querySelector('[data-delivery]');
  if (!deliveryElement) return;

  deliveryElement.textContent = delivery.formattedDate || '';
};

const observeDeliveryChanges = () => {
  const deliveryDateTab = document.querySelector('[data-jtabs="delivery-date"]');
  const deliveryEditDateTab = document.querySelector('[data-jtabs="delivery-edit-date"]');

  const observer = new MutationObserver(() => {
    console.log('Tab changed, updating delivery data');
    saveDeliveryData();
    updateDeliveryDisplay();
  });

  const observeTabButtons = (tab) => {
    if (!tab) return;
    const buttons = tab.querySelectorAll('[data-jtabs="control"]');
    buttons.forEach((button) => {
      observer.observe(button, { attributes: true, attributeFilter: ['class', 'aria-selected'] });
    });
  };

  observeTabButtons(deliveryDateTab);
  observeTabButtons(deliveryEditDateTab);

  const dateInput = document.querySelector('.input-data-delivery__input[data-flatpickr-time-delivery]');
  const timeSelect = document.querySelector('select[data-choice-time-delivery]');

  if (dateInput && dateInput._flatpickr) {
    dateInput._flatpickr.config.onChange.push((selectedDates, dateStr, instance) => {
      console.log('Flatpickr date changed:', dateStr);
      saveDeliveryData();
      updateDeliveryDisplay();
    });
  }

  if (timeSelect) {
    timeSelect.addEventListener('change', () => {
      console.log('Time select changed:', timeSelect.value);
      saveDeliveryData();
      updateDeliveryDisplay();
    });
  }
};

const initDeliveryData = () => {
  observeDeliveryChanges();

  document.addEventListener('quiz-step-changed', (e) => {
    if (e.detail.step === 5) {
      saveDeliveryData();
      updateDeliveryDisplay();
    }
  });

  certificateState.addEventListener('change', () => {
    updateDeliveryDisplay();
  });

  setTimeout(() => {
    console.log('initDeliveryData: initializing after delay');
    saveDeliveryData();
    updateDeliveryDisplay();
  }, 500);
};

export { initDeliveryData, saveDeliveryData, getDeliveryData, updateDeliveryDisplay };
