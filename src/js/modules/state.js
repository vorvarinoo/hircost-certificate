/**
 * Модуль управления состоянием сертификата (State Manager)
 * Хранит цвет и выбранное изображение сертификата
 */
class CertificateState extends EventTarget {
  constructor() {
    super();
    this.data = {
      design: { image: null },
      color: null,
      price: 6000,
      recipient: {
        type: 'self',
        name: '',
        phone: '',
        wishes: '',
        from: ''
      }
    };
  }

  set(key, value) {
    if (key.includes('.')) {
      const keys = key.split('.');
      let obj = this.data;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
    } else {
      this.data[key] = value;
    }
    this.dispatchEvent(new CustomEvent('change', {
      detail: { ...this.data }
    }));
  }

  get() {
    return { ...this.data };
  }

  getByKey(key) {
    if (key.includes('.')) {
      const keys = key.split('.');
      let obj = this.data;
      for (const k of keys) {
        obj = obj[k];
      }
      return obj;
    }
    return this.data[key];
  }
}

const certificateState = new CertificateState();

export default certificateState;
