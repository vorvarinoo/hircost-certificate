/**
 * MINI INPUT COMPONENT
 *
 * Полная функциональность для внедрения в свой проект
 * Плавающая метка + очистка + валидация + подсказки
 *
 * Использование:
 * 1. Подключи этот JS файл
 * 2. Используй HTML структуру из примеров
 * 3. Подключи CSS стили
 */

class MiniInput {
  constructor(container) {
    this.init(container);
  }

  init(container) {
    this.container = container;
    this.input = this.container.querySelector('input, textarea');

    if (!this.input) {
      return;
    }

    // Сохраняем ссылку на экземпляр
    this.container.miniInput = this;

    // Получаем тип input
    this.type = this.container.getAttribute('data-input') || 'text';

    // Получаем элементы
    this.clear = this.container.querySelector('[data-input-clear]');
    this.hints = this.container.querySelector('.input__hints');

    // Инициализация кнопки очистки
    if (this.clear) {
      this.clear.addEventListener('click', () => {
        this.setValue('');
      });
    }

    // Устанавливаем начальное состояние
    this.updateHasValue();

    // Обработчики событий
    this.input.addEventListener('input', () => {
      this.handleInput();
    });

    this.input.addEventListener('change', () => {
      this.handleInput();
    });

    // Инициализация подсказок
    if (this.hints) {
      this.initHints();
    }
  }

  /**
   * Обработка ввода - основная логика
   */
  handleInput() {
    let cleanValue = this.input.value;

    // Очистка для телефона/чисел
    if (this.type === 'tel' || this.type === 'number') {
      cleanValue = cleanValue.replace(/\D/g, '');
      this.input.value = cleanValue;
    }

    // Ограничение по maxlength
    if (this.input.hasAttribute('maxlength')) {
      const maxLength = parseInt(this.input.getAttribute('maxlength'));
      if (cleanValue.length > maxLength) {
        cleanValue = cleanValue.substring(0, maxLength);
        this.input.value = cleanValue;
      }
    }

    // Обновляем состояние _has-value
    this.updateHasValue();
  }

  /**
   * Обновление класса _has-value - ГЛАВНАЯ ЛОГИКА
   */
  updateHasValue() {
    const hasValue = this.input.value.length > 0;
    this.container.classList.toggle('_has-value', hasValue);

    // Показываем/скрываем подсказки
    if (this.hints) {
      this.hints.hidden = !hasValue;
    }
  }

  /**
   * Инициализация подсказок
   */
  initHints() {
    // Показываем при вводе
    this.input.addEventListener('focus', () => {
      if (this.input.value.length > 0) {
        this.hints.hidden = false;
      }
    });

    // Скрываем при клике вне input
    document.addEventListener('click', (evt) => {
      if (!this.container.contains(evt.target)) {
        this.hints.hidden = true;
      }
    });

    // Обработка клика по подсказке
    const hints = this.hints.querySelectorAll('li');
    hints.forEach((hint) => {
      hint.addEventListener('click', () => {
        const value = hint.getAttribute('data-input-hint-value');
        this.setValue(value);
        this.hints.hidden = true;
      });
    });
  }

  /**
   * Установить значение
   */
  setValue(value) {
    this.input.value = value;
    this.input.dispatchEvent(new Event('input'));
  }

  /**
   * Получить значение
   */
  getValue() {
    return this.input.value;
  }

  /**
   * Очистить значение
   */
  clearValue() {
    this.setValue('');
  }

  /**
   * Показать ошибку
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
   * Скрыть ошибку
   */
  hideError() {
    this.container.classList.remove('_error');
    const errorText = this.container.querySelector('.input__error-text');
    if (errorText) {
      errorText.classList.remove('_active');
    }
  }

  /**
   * Фокус на input
   */
  focus() {
    this.input.focus();
  }

  /**
   * Убрать фокус
   */
  blur() {
    this.input.blur();
  }

  /**
   * Отключить input
   */
  disable() {
    this.input.disabled = true;
  }

  /**
   * Включить input
   */
  enable() {
    this.input.disabled = false;
  }
}

// ============================================
// АВТОМАТИЧЕСКАЯ ИНИЦИАЛИЗАЦИЯ
// ============================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-mini-input]').forEach((input) => {
      new MiniInput(input);
    });
  });
} else {
  document.querySelectorAll('[data-mini-input]').forEach((input) => {
    new MiniInput(input);
  });
}

// Экспорт для использования в модулях
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MiniInput;
}
