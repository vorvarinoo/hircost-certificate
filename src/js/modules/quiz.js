const screens = document.querySelectorAll(".quiz__screen.screen");
const steps = document.querySelectorAll(".timeline__step");

let currentStep = 1;
const totalSteps = screens.length;

const updateUI = (step) => {
  screens.forEach((screen) => {
    const screenNum = parseInt(screen.dataset.screen);
    screen.classList.toggle("isActive", screenNum === step);
    screen.hidden = screenNum !== step;
  });

  steps.forEach((stepEl) => {
    const stepNum = parseInt(stepEl.dataset.step);
    stepEl.classList.toggle("isActive", stepNum === step);
    stepEl.classList.toggle("completed", stepNum < step);
  });
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

  updateUI(1);
};

export { initQuiz };
