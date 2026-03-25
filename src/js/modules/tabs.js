import 'justtabs/dist/just-tabs.min.css';
import JustTabs from 'justtabs';

const initTabs = () => {
  const recipientContactsTab = document.querySelector('#recipient-contacts');
  if (recipientContactsTab) {
    new JustTabs('recipient-contacts', {
      startTabIndex: 1,
    });
  }

  const deliveryDateTab = document.querySelector('#delivery-date');
  if (deliveryDateTab) {
    new JustTabs('delivery-date', {
      startTabIndex: 1,
    });
  }
};

export { initTabs };
