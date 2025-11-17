/**
 * Modal controller - handles modal open/close and focus management
 */
import { $ } from '../utils/dom-helpers.js';
import { AddTodoForm } from '../components/add-todo-form.js';

/**
 * Modal controller class
 */
export class ModalController {
  constructor(app) {
    this.app = app;
    this.previousActiveElement = null;
  }

  /**
   * Open the modal
   * @param {Object|null} todo - Todo to edit, or null for new todo
   */
  open(todo = null) {
    const modal = $('#todo-modal');
    if (!modal) return;

    this.previousActiveElement = document.activeElement;

    if (todo) {
      this.app.currentEditId = todo.id;
    } else {
      this.app.currentEditId = null;
    }

    modal.outerHTML = AddTodoForm(todo);

    const newModal = $('#todo-modal');
    if (newModal) {
      newModal.classList.add('active');
      newModal.setAttribute('aria-hidden', 'false');
    }

    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    if (this.app.eventHandlers) {
      this.app.eventHandlers.formController.attachListeners();
      this.app.eventHandlers.attachModalListeners();
    }

    setTimeout(() => {
      const firstInput = $('#todo-title');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }

  /**
   * Close the modal
   */
  close() {
    const modal = $('#todo-modal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scrolling

    this.app.currentEditId = null;
    const form = modal.querySelector('#todo-form');
    if (form) {
      form.reset();
    }

    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  /**
   * Handle focus trap for accessibility
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleFocusTrap(e) {
    const modal = $('#todo-modal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'Tab') {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
}

