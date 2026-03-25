const initEnvelope = () => {
  const envelope = document.querySelector('.get-certificate .envelope');
  if (!envelope) return;

  const openBtn = document.querySelector('[data-open-envelope]');

  if (!openBtn) return;

  const openEnvelope = () => {
    envelope.classList.add('envelope--open');
  };

  openBtn.addEventListener('click', openEnvelope);
  envelope.addEventListener('click', openEnvelope);
};

export { initEnvelope };
