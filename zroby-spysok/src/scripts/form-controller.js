/**
 * Form controller - handles form submission and validation
 */
import { $ } from '../utils/dom-helpers.js';
import { validateTodoForm, extractFormData, clearAllErrors, validateField, clearFieldError } from '../utils/validation.js';

/**
 * Form controller class
 */
export class FormController {
  constructor(app) {
    this.app = app;
  }

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!validateTodoForm(form)) {
      return;
    }

    const todoData = extractFormData(form);

    if (this.app.currentEditId) {
      this.app.updateTodo(this.app.currentEditId, todoData);
    } else {
      this.app.createTodo(todoData);
    }

    form.reset();
    clearAllErrors(form);
  }

  /**
   * Attach form event listeners
   */
  attachListeners() {
    const form = $('#todo-form');
    if (!form) return;

    form.addEventListener('submit', (e) => this.handleSubmit(e));

    const cancelBtn = $('#cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.app.cancelEdit());
    }

    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearFieldError(input));
    });
  }
}

