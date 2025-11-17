/**
 * Main application entry point
 */
import { Navbar } from "./components/navbar.js";
import { AddTodoForm } from "./components/add-todo-form.js";
import { TodoCard } from "./components/todo-card.js";
import { $ } from "./utils/dom-helpers.js";
import { loadTodos } from "./utils/api-helpers.js";
import { applyAllFilters } from "./utils/filter-helpers.js";
import { EventHandlers } from "./scripts/event-handlers.js";

/**
 * Main application state and logic
 */
class TodoApp {
  constructor() {
    this.todos = [];
    this.filteredTodos = [];
    this.currentEditId = null;
    this.filters = {
      status: 'all',
      priority: 'all',
      search: ''
    };
    this.sortOrder = 'asc';
    this.modalController = null; // Will be set by EventHandlers
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    this.renderStructure();
    await this.loadTodos();
    this.setupEventHandlers();
    this.renderTodos();
  }

  /**
   * Render the basic HTML structure
   */
  renderStructure() {
    $('#app').innerHTML = `
      <div id="navbar"></div>
      <main>
        <section class="filters-section" aria-labelledby="filters-title">
          <h2 id="filters-title" class="sr-only">Filters and Search</h2>
          <div class="filters-container">
            <div class="filter-group">
              <label for="filter-status">Filter by Status</label>
              <select id="filter-status" aria-label="Filter todos by status">
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="filter-priority">Filter by Priority</label>
              <select id="filter-priority" aria-label="Filter todos by priority">
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div class="filter-group">
              <label for="search-input">Search</label>
              <input 
                type="text" 
                id="search-input" 
                placeholder="Search by title or description..."
                aria-label="Search todos by title or description"
              />
            </div>
          </div>
        </section>
        <section class="todo-list-section" aria-labelledby="todo-list-title">
          <div class="todo-list-header">
            <h2 id="todo-list-title">Tasks</h2>
            <div class="sort-controls">
              <label for="sort-order">Sort by Due Date</label>
              <select id="sort-order" aria-label="Sort todos by due date">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <div id="todo-list" class="todo-list" role="list" aria-label="List of tasks"></div>
        </section>
      </main>
      <footer role="contentinfo">
        <p>ToDo Task Manager - Lab Work #1</p>
      </footer>
    `;

    $('#navbar').innerHTML = Navbar();
    // Add modal to app
    const app = $('#app');
    app.insertAdjacentHTML('beforeend', AddTodoForm());
  }

  /**
   * Load todos from data source
   */
  async loadTodos() {
    try {
      this.todos = await loadTodos();
      this.filteredTodos = [...this.todos];
      this.applyFilters(); // Reapply filters after loading
    } catch (error) {
      console.error('Error loading todos:', error);
      const todoList = $('#todo-list');
      if (todoList) {
        todoList.innerHTML = `
          <div class="todo-list empty">
            <p>Error loading tasks. Please make sure the backend server is running at http://localhost:8000</p>
          </div>
        `;
      }
    }
  }

  /**
   * Setup event handlers
   */
  setupEventHandlers() {
    this.eventHandlers = new EventHandlers(this);
    this.eventHandlers.attachAll();
  }

  /**
   * Apply filters, search, and sorting
   */
  applyFilters() {
    this.filteredTodos = applyAllFilters(this.todos, this.filters, this.sortOrder);
    this.renderTodos();
  }

  /**
   * Render all todos
   */
  renderTodos() {
    const todoList = $('#todo-list');
    if (!todoList) return;

    if (this.filteredTodos.length === 0) {
      todoList.className = 'todo-list empty';
      const hasActiveFilters = this.filters.search || 
                               this.filters.status !== 'all' || 
                               this.filters.priority !== 'all';
      todoList.innerHTML = `
        <p>No tasks found. ${hasActiveFilters ? 'Try adjusting your filters.' : 'Add a new task to get started!'}</p>
      `;
      return;
    }

    todoList.className = 'todo-list';
    todoList.innerHTML = this.filteredTodos
      .map(todo => TodoCard(todo))
      .join('');
  }

  /**
   * Create a new todo (delegates to TodoController)
   */
  createTodo(todoData) {
    this.eventHandlers.todoController.create(todoData);
  }

  /**
   * Update an existing todo (delegates to TodoController)
   */
  updateTodo(id, todoData) {
    this.eventHandlers.todoController.update(id, todoData);
  }

  /**
   * Delete a todo (delegates to TodoController)
   */
  deleteTodo(id) {
    this.eventHandlers.todoController.delete(id);
  }

  /**
   * Edit a todo (delegates to TodoController)
   */
  editTodo(id) {
    this.eventHandlers.todoController.edit(id);
  }

  /**
   * Toggle todo status (delegates to TodoController)
   */
  toggleStatus(id) {
    this.eventHandlers.todoController.toggleStatus(id);
  }

  /**
   * Cancel edit mode
   */
  cancelEdit() {
    if (this.modalController) {
      this.modalController.close();
    }
  }
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
  });
} else {
  new TodoApp();
}
