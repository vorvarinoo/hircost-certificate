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

    const hiddenElements = document.querySelectorAll('[data-hidden]');
    hiddenElements.forEach(el => el.classList.add('hidden'));

    const video = document.querySelector('.video-bg');
    if (video) {
      video.play().catch(err => {
        console.warn('Video autoplay prevented:', err);
      });
    }

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
