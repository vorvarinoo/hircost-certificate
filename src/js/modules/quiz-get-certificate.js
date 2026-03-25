const initGetCertificateScreens = () => {
  const screens = document.querySelectorAll('[data-screen-get-certificate]');
  if (screens.length === 0) return;

  const screenItems = Array.from(screens, (screen) => ({
    el: screen,
    num: Number(screen.dataset.screenGetCertificate),
  }));

  const showScreen = (targetScreen) => {
    screenItems.forEach((item) => {
      const isActive = item.num === targetScreen;
      item.el.classList.toggle('isActive', isActive);
    });
  };

  // Инициализация - показываем первый экран
  showScreen(1);

  // Экспортируем функцию для использования в envelope.js
  window.certificateScreens = {
    show: showScreen,
  };
};

export { initGetCertificateScreens };
