const initEnvelope = () => {
  const envelope = document.querySelector('.certificate-unbox .envelope');
  if (!envelope) return;

  const openBtn = document.querySelector('[data-open-envelope]');
  if (!openBtn) return;

  const screens = document.querySelectorAll('[data-screen-get-certificate]');
  const screenItems = Array.from(screens, (screen) => ({
    el: screen,
    num: Number(screen.dataset.screenGetCertificate),
  }));

  // Показать первый экран по умолчанию
  const showScreen = (targetScreen) => {
    screenItems.forEach((item) => {
      const isActive = item.num === targetScreen;
      item.el.classList.toggle('isActive', isActive);
    });
  };

  // Инициализация - показываем первый экран
  showScreen(1);

  let isOpened = false;

  const openEnvelope = () => {
    if (isOpened) return;
    isOpened = true;

    envelope.classList.add('envelope--open');

    setTimeout(() => {
      showScreen(2);
    }, 1000);
  };

  openBtn.addEventListener('click', openEnvelope);
  envelope.addEventListener('click', openEnvelope);
};

export { initEnvelope };
