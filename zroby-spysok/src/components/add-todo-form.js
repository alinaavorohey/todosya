import { escapeHtml } from "../utils/escape-html.js";

/**
 * Renders the Add/Edit Todo Form component
 * @param {Object|null} todo - The todo object to edit, or null for new todo
 * @returns {string} HTML string for the form
 */
export const AddTodoForm = (todo = null) => {
  const isEditMode = todo !== null;
  const title = escapeHtml(todo?.title || '');
  const description = escapeHtml(todo?.description || '');
  const priority = todo?.priority || 'medium';
  const status = todo?.status || 'pending';
  const dueDate = todo?.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '';

  return `
    <div class="modal-overlay" id="todo-modal" role="dialog" aria-modal="true" aria-labelledby="form-title" aria-hidden="true">
      <div class="modal-container">
        <div class="modal-header">
          <h2 id="form-title">${isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
          <button 
            type="button" 
            class="modal-close-btn" 
            id="modal-close-btn"
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        <section class="add-todo-section">
          <form class="todo-form" id="todo-form" novalidate>
        <div class="form-group">
          <label for="todo-title">Title <span aria-label="required">*</span></label>
          <input 
            type="text" 
            id="todo-title" 
            name="todo-title" 
            placeholder="Enter task title"
            value="${title}"
            required
            aria-required="true"
            aria-describedby="title-error"
          />
          <span class="error-message" id="title-error" role="alert"></span>
        </div>

        <div class="form-group full-width">
          <label for="todo-description">Description</label>
          <textarea 
            id="todo-description" 
            name="todo-description" 
            placeholder="Enter task description (optional)"
            rows="3"
            aria-describedby="description-error"
          >${description}</textarea>
          <span class="error-message" id="description-error" role="alert"></span>
        </div>

        <div class="form-group">
          <label for="todo-priority">Priority <span aria-label="required">*</span></label>
          <select 
            id="todo-priority" 
            name="todo-priority" 
            required
            aria-required="true"
            aria-describedby="priority-error"
          >
            <option value="low" ${priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${priority === 'high' ? 'selected' : ''}>High</option>
          </select>
          <span class="error-message" id="priority-error" role="alert"></span>
        </div>

        <div class="form-group">
          <label for="todo-status">Status <span aria-label="required">*</span></label>
          <select 
            id="todo-status" 
            name="todo-status" 
            required
            aria-required="true"
            aria-describedby="status-error"
          >
            <option value="pending" ${status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="in-progress" ${status === 'in-progress' ? 'selected' : ''}>In Progress</option>
            <option value="completed" ${status === 'completed' ? 'selected' : ''}>Completed</option>
          </select>
          <span class="error-message" id="status-error" role="alert"></span>
        </div>

        <div class="form-group">
          <label for="todo-due-date">Due Date <span aria-label="required">*</span></label>
          <input 
            type="date" 
            id="todo-due-date" 
            name="todo-due-date" 
            value="${dueDate}"
            required
            aria-required="true"
            aria-describedby="due-date-error"
          />
          <span class="error-message" id="due-date-error" role="alert"></span>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" id="cancel-btn">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">
            ${isEditMode ? 'Update Task' : 'Add Task'}
          </button>
          </div>
          </form>
        </section>
      </div>
    </div>
  `;
};
