/**
 * Main event handlers - coordinates all event listeners
 */
import { $ } from '../utils/dom-helpers.js';
import { FormController } from './form-controller.js';
import { FilterController } from './filter-controller.js';
import { TodoController } from './todo-controller.js';
import { ModalController } from './modal-controller.js';

/**
 * Event handlers coordinator
 */
export class EventHandlers {
  constructor(app) {
    this.app = app;
    this.formController = new FormController(app);
    this.filterController = new FilterController(app);
    this.todoController = new TodoController(app);
    this.modalController = new ModalController(app);

    // Attach modal controller to app for easy access
    app.modalController = this.modalController;
  }

  /**
   * Attach all event listeners
   */
  attachAll() {
    this.formController.attachListeners();
    this.filterController.attachListeners();
    this.todoController.attachListeners();
    this.attachModalListeners();
    this.attachKeyboardListeners();
  }

  /**
   * Attach modal-specific event listeners
   */
  attachModalListeners() {
    const openModalBtn = $('#open-modal-btn');
    if (openModalBtn) {
      openModalBtn.addEventListener('click', () => this.modalController.open());
    }

    const modalCloseBtn = $('#modal-close-btn');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => this.modalController.close());
    }

    const modalOverlay = $('#todo-modal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          this.modalController.close();
        }
      });
    }
  }

  /**
   * Attach keyboard event listeners
   */
  attachKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      const modal = $('#todo-modal');
      if (!modal || !modal.classList.contains('active')) return;

      if (e.key === 'Escape') {
        this.modalController.close();
        return;
      }

      this.modalController.handleFocusTrap(e);
    });
  }
}

