/**
 * Todo controller - handles CRUD operations and todo actions
 */
import { generateId } from '../utils/id-generator.js';

/**
 * Todo controller class
 */
export class TodoController {
  constructor(app) {
    this.app = app;
  }

  /**
   * Create a new todo
   * @param {Object} todoData - Todo data
   */
  create(todoData) {
    const newTodo = {
      id: generateId(),
      ...todoData
    };

    this.app.todos.push(newTodo);
    this.app.applyFilters();
    this.app.modalController.close();
  }

  /**
   * Update an existing todo
   * @param {string} id - Todo ID
   * @param {Object} todoData - Updated todo data
   */
  update(id, todoData) {
    const index = this.app.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.app.todos[index] = { ...this.app.todos[index], ...todoData };
      this.app.applyFilters();
      this.app.modalController.close();
    }
  }

  /**
   * Delete a todo
   * @param {string} id - Todo ID
   */
  delete(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.app.todos = this.app.todos.filter(todo => todo.id !== id);
      this.app.applyFilters();
    }
  }

  /**
   * Edit a todo (opens modal)
   * @param {string} id - Todo ID
   */
  edit(id) {
    const todo = this.app.todos.find(t => t.id === id);
    if (todo) {
      this.app.modalController.open(todo);
    }
  }

  /**
   * Toggle todo status
   * @param {string} id - Todo ID
   */
  toggleStatus(id) {
    const todo = this.app.todos.find(t => t.id === id);
    if (todo) {
      if (todo.status === 'completed') {
        todo.status = 'pending';
      } else if (todo.status === 'pending') {
        todo.status = 'in-progress';
      } else {
        todo.status = 'completed';
      }
      this.app.applyFilters();
    }
  }

  /**
   * Handle todo card actions (event delegation)
   * @param {Event} e - Click event
   */
  handleCardAction(e) {
    const card = e.target.closest('.todo-card');
    if (!card) return;

    const action = e.target.dataset.action;
    const todoId = card.dataset.id;

    if (action === 'edit') {
      this.edit(todoId);
    } else if (action === 'delete') {
      this.delete(todoId);
    } else if (action === 'toggle-status') {
      this.toggleStatus(todoId);
    }
  }

  /**
   * Attach todo event listeners
   */
  attachListeners() {
    document.addEventListener('click', (e) => this.handleCardAction(e));
  }
}

