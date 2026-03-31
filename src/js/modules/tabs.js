import 'justtabs/dist/just-tabs.min.css';
import JustTabs from 'justtabs';

const initTabs = () => {
  const recipientContactsTab = document.querySelector(
    '[data-jtabs="recipient-contacts"]',
  );
  if (recipientContactsTab) {
    new JustTabs('recipient-contacts', {
      startTabIndex: 1,
    });
  }

  const recipientEditContactsTab = document.querySelector(
    '[data-jtabs="recipient-edit-contacts"]',
  );
  if (recipientEditContactsTab) {
    new JustTabs('recipient-edit-contacts', {
      startTabIndex: 1,
    });
  }

  const deliveryDateTab = document.querySelector(
    '[data-jtabs="delivery-date"]',
  );
  if (deliveryDateTab) {
    new JustTabs('delivery-date', {
      startTabIndex: 1,
    });
  }

  const deliveryEditDateTab = document.querySelector(
    '[data-jtabs="delivery-edit-date"]',
  );
  if (deliveryEditDateTab) {
    new JustTabs('delivery-edit-date', {
      startTabIndex: 1,
    });
  }
};

export { initTabs };
