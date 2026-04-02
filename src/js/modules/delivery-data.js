import certificateState from './state.js';

let tempDeliveryData = null;
let savedDeliveryData = null;

const isDeliveryEditMode = () => {
  const editBlock = document.querySelector('[data-delivery-edit]');
  return editBlock && !editBlock.classList.contains('hidden');
};

const getActiveDeliveryTab = () => {
  const deliveryDateTabs = document.querySelectorAll('[data-jtabs="delivery-date"]');
  const deliveryEditDateTabs = document.querySelectorAll('[data-jtabs="delivery-edit-date"]');

  const allTabs = [...deliveryDateTabs, ...deliveryEditDateTabs];
  if (allTabs.length === 0) return null;

  for (const activeTab of allTabs) {
    const panels = activeTab.querySelectorAll('[data-jtabs="panel"]');
    if (panels.length === 0) continue;

    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const isVisible = panel.classList.contains('is-visible');

      if (isVisible) {
        const todayPanel = panel.querySelector('.delivery-today');
        if (todayPanel) return { type: 'today', container: activeTab };

        const formPanel = panel.querySelector('[date-form-delivery]');
        if (formPanel) return { type: 'custom', container: activeTab };
      }
    }
  }

  return { type: 'today', container: allTabs[0] };
};

const syncDeliveryToSection4 = (data) => {
  const section4Tab = document.querySelector('[data-jtabs="delivery-date"]');
  if (!section4Tab) return;

  const dateInput = section4Tab.querySelector('.input-data-delivery__input[data-flatpickr-time-delivery]');
  const timeSelect = section4Tab.querySelector('select[data-choice-time-delivery]');

  if (data.type === 'custom') {
    if (dateInput && dateInput._flatpickr && data.date) {
      dateInput._flatpickr.setDate(data.date);
    }

    if (timeSelect && data.time) {
      timeSelect.value = data.time;
    }

    const buttons = section4Tab.querySelectorAll('[data-jtabs="control"]');
    if (buttons.length >= 2) {
      buttons[1].click();
    }
  } else {
    const buttons = section4Tab.querySelectorAll('[data-jtabs="control"]');
    if (buttons.length >= 1) {
      buttons[0].click();
    }
  }
};

const syncDeliveryToSection2 = (data) => {
  const section2Tab = document.querySelector('[data-jtabs="delivery-edit-date"]');
  if (!section2Tab) return;

  const dateInput = section2Tab.querySelector('.input-data-delivery__input[data-flatpickr-time-delivery]');
  const timeSelect = section2Tab.querySelector('select[data-choice-time-delivery]');

  if (data.type === 'custom') {
    if (dateInput && dateInput._flatpickr && data.date) {
      dateInput._flatpickr.setDate(data.date);
    }

    if (timeSelect && data.time) {
      timeSelect.value = data.time;
    }

    const buttons = section2Tab.querySelectorAll('[data-jtabs="control"]');
    if (buttons.length >= 2) {
      buttons[1].click();
    }
  } else {
    const buttons = section2Tab.querySelectorAll('[data-jtabs="control"]');
    if (buttons.length >= 1) {
      buttons[0].click();
    }
  }
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
  const tabInfo = getActiveDeliveryTab();
  if (!tabInfo) return null;

  const isEditContainer = tabInfo.container.matches('[data-jtabs="delivery-edit-date"]');

  if (tabInfo.type === 'today') {
    const data = {
      type: 'today',
      date: '',
      time: '',
      formattedDate: formatDeliveryDate('', '')
    };

    if (isEditContainer) {
      tempDeliveryData = data;
      updateDeliveryDisplay(data);
    } else {
      certificateState.set('delivery.type', data.type);
      certificateState.set('delivery.date', data.date);
      certificateState.set('delivery.time', data.time);
      certificateState.set('delivery.formattedDate', data.formattedDate);
    }

    return data;
  }

  const container = tabInfo.container;
  const dateInput = container.querySelector('.input-data-delivery__input[data-flatpickr-time-delivery]');
  const timeSelect = container.querySelector('select[data-choice-time-delivery]');

  let dateValue = '';
  if (dateInput && dateInput._flatpickr) {
    const fp = dateInput._flatpickr;
    if (fp.selectedDates && fp.selectedDates[0]) {
      dateValue = fp.formatDate(fp.selectedDates[0], 'Y-m-d');
    }
  }

  const timeValue = timeSelect?.value || '12:00';

  const data = {
    type: 'custom',
    date: dateValue,
    time: timeValue,
    formattedDate: formatDeliveryDate(dateValue, timeValue)
  };

  console.log('getDeliveryData: custom tab', { dateValue, timeValue, container: container.className, isEditContainer });

  if (isEditContainer) {
    tempDeliveryData = data;
    updateDeliveryDisplay(data);
  } else {
    certificateState.set('delivery.type', data.type);
    certificateState.set('delivery.date', data.date);
    certificateState.set('delivery.time', data.time);
    certificateState.set('delivery.formattedDate', data.formattedDate);
  }

  return data;
};

const applyDelivery = () => {
  if (tempDeliveryData) {
    certificateState.set('delivery.type', tempDeliveryData.type);
    certificateState.set('delivery.date', tempDeliveryData.date);
    certificateState.set('delivery.time', tempDeliveryData.time);
    certificateState.set('delivery.formattedDate', tempDeliveryData.formattedDate);

    syncDeliveryToSection4(tempDeliveryData);

    tempDeliveryData = null;
    savedDeliveryData = null;

    console.log('applyDelivery: applied and synced to section 4');
  }
};

const prepareDeliveryEdit = () => {
  savedDeliveryData = certificateState.getByKey('delivery');
  tempDeliveryData = null;

  if (savedDeliveryData) {
    syncDeliveryToSection2(savedDeliveryData);
  }

  console.log('prepareDeliveryEdit: prepared with saved data', savedDeliveryData);
};

const rollbackDelivery = () => {
  if (savedDeliveryData) {
    syncDeliveryToSection2(savedDeliveryData);
    updateDeliveryDisplay();

    tempDeliveryData = null;
    savedDeliveryData = null;

    console.log('rollbackDelivery: rolled back to saved data');
  }
};

const updateDeliveryDisplay = (overrideData = null) => {
  let delivery;

  if (overrideData) {
    delivery = overrideData;
  } else if (isDeliveryEditMode() && tempDeliveryData) {
    delivery = tempDeliveryData;
  } else {
    delivery = certificateState.getByKey('delivery');
  }

  if (!delivery) return;

  const deliveryElement = document.querySelector('[data-delivery]');
  if (!deliveryElement) return;

  deliveryElement.textContent = delivery.formattedDate || '';
};

const observeDeliveryChanges = () => {
  const deliveryDateTabs = document.querySelectorAll('[data-jtabs="delivery-date"]');
  const deliveryEditDateTabs = document.querySelectorAll('[data-jtabs="delivery-edit-date"]');

  const observer = new MutationObserver(() => {
    console.log('Tab changed, updating delivery data');
    getDeliveryData();
  });

  const observeTabButtons = (tab) => {
    if (!tab) return;
    const buttons = tab.querySelectorAll('[data-jtabs="control"]');
    buttons.forEach((button) => {
      observer.observe(button, { attributes: true, attributeFilter: ['class', 'aria-selected'] });
    });
  };

  deliveryDateTabs.forEach(tab => observeTabButtons(tab));
  deliveryEditDateTabs.forEach(tab => observeTabButtons(tab));

  const allTabs = [...deliveryDateTabs, ...deliveryEditDateTabs];
  allTabs.forEach(tab => {
    const dateInput = tab.querySelector('.input-data-delivery__input[data-flatpickr-time-delivery]');
    const timeSelect = tab.querySelector('select[data-choice-time-delivery]');

    if (dateInput && dateInput._flatpickr) {
      dateInput._flatpickr.config.onChange.push((selectedDates, dateStr, instance) => {
        console.log('Flatpickr date changed:', dateStr);
        getDeliveryData();
      });
    }

    if (timeSelect) {
      timeSelect.addEventListener('change', () => {
        console.log('Time select changed:', timeSelect.value);
        getDeliveryData();
      });
    }
  });
};

const initDeliveryData = () => {
  observeDeliveryChanges();

  document.addEventListener('quiz-step-changed', (e) => {
    if (e.detail.step === 5) {
      getDeliveryData();
      updateDeliveryDisplay();
    }
  });

  certificateState.addEventListener('change', () => {
    updateDeliveryDisplay();
  });

  setTimeout(() => {
    console.log('initDeliveryData: initializing after delay');
    getDeliveryData();
    updateDeliveryDisplay();
  }, 500);
};

export { initDeliveryData, applyDelivery, prepareDeliveryEdit, rollbackDelivery, getDeliveryData, updateDeliveryDisplay };
