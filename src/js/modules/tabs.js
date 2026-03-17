import 'justtabs/dist/just-tabs.min.css';
import JustTabs from 'justtabs';

const initTabs = () => {
  new JustTabs('recipient-contacts', {
    startTabIndex: 1,
  });

  new JustTabs('delivery-date', {
    startTabIndex: 1,
  });
};

export { initTabs };
