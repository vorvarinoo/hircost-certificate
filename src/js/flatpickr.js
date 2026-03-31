import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

flatpickr('[data-flatpickr-time-delivery]', {
  locale: Russian,
  altInput: true,
  altFormat: 'j F Y',
  dateFormat: 'Y-m-d',
  minDate: new Date().fp_incr(1),
  defaultDate: new Date().fp_incr(1),
});
