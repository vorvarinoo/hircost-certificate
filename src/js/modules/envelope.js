const initEnvelope = () => {
  const envelope = document.querySelector('.certificate-unbox .envelope');
  if (!envelope) return;

  const openBtn = document.querySelector('[data-open-envelope]');
  if (!openBtn) return;

  let isOpened = false;

  const openEnvelope = () => {
    if (isOpened) return;
    isOpened = true;

    envelope.classList.add('envelope--open');

    setTimeout(() => {
      // Используем глобальную функцию из quiz-get-certificate.js
      if (window.certificateScreens && window.certificateScreens.show) {
        window.certificateScreens.show(2);
      }
    }, 2500);
  };

  openBtn.addEventListener('click', openEnvelope);
  envelope.addEventListener('click', openEnvelope);
};

export { initEnvelope };
