/**
 * Todo controller - handles CRUD operations and todo actions
 */
import { createTodo, updateTodo, deleteTodo } from '../utils/api-helpers.js';

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
  async create(todoData) {
    try {
      const newTodo = await createTodo(todoData);
      // Reload todos from API to get updated list
      await this.app.loadTodos();
      this.app.modalController.close();
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create task. Please try again.');
    }
  }

  /**
   * Update an existing todo
   * @param {string|number} id - Todo ID
   * @param {Object} todoData - Updated todo data
   */
  async update(id, todoData) {
    try {
      await updateTodo(id, todoData);
      // Reload todos from API to get updated list
      await this.app.loadTodos();
      this.app.modalController.close();
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update task. Please try again.');
    }
  }

  /**
   * Delete a todo
   * @param {string|number} id - Todo ID
   */
  async delete(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(id);
        // Reload todos from API to get updated list
        await this.app.loadTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  }

  /**
   * Edit a todo (opens modal)
   * @param {string|number} id - Todo ID
   */
  edit(id) {
    // Convert id to number for comparison (backend returns numeric IDs)
    const todo = this.app.todos.find(t => t.id == id);
    if (todo) {
      this.app.modalController.open(todo);
    }
  }

  /**
   * Toggle todo status
   * @param {string|number} id - Todo ID
   */
  async toggleStatus(id) {
    const todo = this.app.todos.find(t => t.id == id);
    if (todo) {
      let newStatus;
      if (todo.status === 'completed') {
        newStatus = 'pending';
      } else if (todo.status === 'pending') {
        newStatus = 'in-progress';
      } else {
        newStatus = 'completed';
      }
      
      try {
        await updateTodo(id, { status: newStatus });
        // Reload todos from API to get updated list
        await this.app.loadTodos();
      } catch (error) {
        console.error('Error updating todo status:', error);
        alert('Failed to update task status. Please try again.');
      }
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

