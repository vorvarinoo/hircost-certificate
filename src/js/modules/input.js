/**
 * Input Component
 *
 * Features:
 * - Floating label animation
 * - Clear button functionality
 * - Input masking for phone and birthdate
 * - Hints/dropdown suggestions
 * - Value validation and sanitization
 *
 * Dependencies:
 * - imask (for date masking): npm install imask
 */

import IMask from 'imask';

class Input {
  constructor(container) {
    this.init(container);
  }

  init(container) {
    this.container = container;
    this.input = this.container.querySelector('input, textarea');

    if (!this.input) {
      return;
    }

    // Store reference on container
    this.container.customInput = this;

    // Get component type
    this.type = this.container.getAttribute('data-input');

    // Get elements
    this.clear = this.container.querySelector('[data-input-clear]');
    this.hints = this.container.querySelector('.input__hints');

    // Initialize clear button
    if (this.clear) {
      this.clear.addEventListener('click', () => {
        this.setValue('');
      });
    }

    // Set initial state
    this.container.classList.toggle('_has-value', this.input.value.length > 0);

    // Handle change event
    this.input.addEventListener('change', () => {
      this.handleInput();
    });

    // Handle input event
    this.input.addEventListener('input', () => {
      this.handleInput();
    });

    // Initialize date mask for birthdate fields
    if (this.type === 'birthdate') {
      this.initDateMask();
    }

    // Initialize phone mask
    if (this.type === 'tel') {
      this.initPhoneMask();
    }

    // Initialize hints functionality
    if (this.hints) {
      this.initHints();
    }
  }

  /**
   * Handle input value changes
   * - Sanitizes phone/number inputs (removes non-digits)
   * - Enforces maxlength
   * - Toggles _has-value class
   */
  handleInput() {
    let cleanValue = this.input.value;

    // Remove non-numeric characters for number inputs
    if (this.type === 'number') {
      cleanValue = cleanValue.replace(/\D/g, '');
      this.input.value = cleanValue;
    }

    // Enforce maxlength if present
    if (this.input.hasAttribute('maxlength')) {
      const maxLength = this.input.getAttribute('maxlength');

      if (this.input.value.length > maxLength) {
        this.input.value = this.input.value.substring(0, maxLength);
      }
    }

    // Update state
    this.container.classList.toggle('_has-value', cleanValue.length > 0);
  }

  /**
   * Initialize date masking for birthdate fields
   */
  initDateMask() {
    IMask(this.input, {
      mask: Date,
      min: new Date(1900, 1, 1),
      max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
    });
  }

  /**
   * Initialize phone masking for phone fields
   */
  initPhoneMask() {
    IMask(this.input, {
      mask: '+{7} (000) 000-00-00',
      lazy: true
    });
  }

  /**
   * Initialize hints/dropdown functionality
   */
  initHints() {
    // Show/hide hints based on input value and focus
    this.input.addEventListener('input', () => {
      this.hints.hidden = !this.input.value;
    });

    this.input.addEventListener('focus', () => {
      this.hints.hidden = !this.input.value;
    });

    // Hide hints when clicking outside
    window.addEventListener('click', (evt) => {
      if (!this.container.contains(evt.target)) {
        this.hints.hidden = true;
      }
    });

    // Handle hint selection
    Array.from(this.hints.children).forEach((hint) => {
      hint.addEventListener('click', () => {
        const value = hint.getAttribute('data-input-hint-value');
        this.input.value = value;
        this.hints.hidden = true;
        this.input.dispatchEvent(new Event('input'));
      });
    });
  }

  /**
   * Set input value programmatically
   * @param {string} value - The value to set
   */
  setValue(value) {
    this.input.value = value;
    this.input.dispatchEvent(new Event('input'));
  }

  /**
   * Get current input value
   * @returns {string}
   */
  getValue() {
    return this.input.value;
  }

  /**
   * Clear input value
   */
  clearValue() {
    this.setValue('');
  }

  /**
   * Focus input
   */
  focus() {
    this.input.focus();
  }

  /**
   * Blur input
   */
  blur() {
    this.input.blur();
  }

  /**
   * Disable input
   */
  disable() {
    this.input.disabled = true;
  }

  /**
   * Enable input
   */
  enable() {
    this.input.disabled = false;
  }

  /**
   * Show error state
   * @param {string} message - Error message to display
   */
  showError(message) {
    this.container.classList.add('_error');
    const errorText = this.container.querySelector('.input__error-text');
    if (errorText) {
      errorText.textContent = message;
      errorText.classList.add('_active');
    }
  }

  /**
   * Hide error state
   */
  hideError() {
    this.container.classList.remove('_error');
    const errorText = this.container.querySelector('.input__error-text');
    if (errorText) {
      errorText.classList.remove('_active');
    }
  }

  /**
   * Destroy component instance
   */
  destroy() {
    // Remove event listeners
    this.input.removeEventListener('change', this.handleInput);
    this.input.removeEventListener('input', this.handleInput);

    if (this.clear) {
      this.clear.removeEventListener('click', () => {
        this.setValue('');
      });
    }

    // Remove reference
    delete this.container.customInput;
  }
}

// ============================================
// AUTO-INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('[data-input]')
    .forEach((input) => new Input(input));
});

// ============================================
// EXPORT
// ============================================
export default Input;
