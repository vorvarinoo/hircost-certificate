const screens = document.querySelectorAll(".quiz__screen.screen");
const steps = document.querySelectorAll(".timeline__step");
const checkedBackgroundTargets = document.querySelectorAll(
  "[data-checked-background-color]"
);

let currentStep = 1;
const totalSteps = screens.length;

const screenItems = Array.from(screens, (screen) => ({
  el: screen,
  num: Number(screen.dataset.screen),
}));

const stepItems = Array.from(steps, (stepEl) => ({
  el: stepEl,
  num: Number(stepEl.dataset.step),
}));

const updateUI = (step) => {
  const activeStep = step;

  for (let i = 0; i < screenItems.length; i += 1) {
    const screenItem = screenItems[i];
    const isActive = screenItem.num === activeStep;
    screenItem.el.classList.toggle("isActive", isActive);
    screenItem.el.hidden = !isActive;
  }

  for (let i = 0; i < stepItems.length; i += 1) {
    const stepItem = stepItems[i];
    stepItem.el.classList.toggle("isActive", stepItem.num === activeStep);
    stepItem.el.classList.toggle("completed", stepItem.num < activeStep);
  }
};

const goToStep = (step) => {
  if (step < 1 || step > totalSteps) return;
  currentStep = step;
  updateUI(currentStep);
};

const initQuiz = () => {
  document.querySelector(".timeline__nav").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const step = parseInt(btn.closest(".timeline__step").dataset.step);
    goToStep(step);
  });

  document.querySelector(".quiz").addEventListener("click", (e) => {
    if (e.target.matches("[data-next]")) {
      goToStep(currentStep + 1);
    } else if (e.target.matches("[data-prev]")) {
      goToStep(currentStep - 1);
    }
  });

  document.addEventListener("change", (e) => {
    const input = e.target;
    if (!input.matches('input[name="color-picker"]')) return;
    if (checkedBackgroundTargets.length === 0) return;

    const label = input.closest(".input-color-picker");
    const swatch = label?.querySelector(".input-color-picker__color");
    const swatchColor =
      swatch?.style.getPropertyValue("--input-color") ||
      getComputedStyle(swatch || input).getPropertyValue("--input-color");
    const color = swatchColor?.trim() || input.dataset.color;
    if (!color) return;

    for (let i = 0; i < checkedBackgroundTargets.length; i += 1) {
      checkedBackgroundTargets[i].style.setProperty(
        "--checked-background-color",
        color
      );
    }
  });

  updateUI(1);
};

export { initQuiz };