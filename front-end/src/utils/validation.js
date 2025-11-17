/**
 * Form validation utilities
 */

/**
 * Show error message for a form field
 * @param {HTMLElement} field - The form field element
 * @param {string} message - Error message to display
 */
export const showFieldError = (field, message) => {
  field.classList.add('error');
  const errorElement = field.parentElement?.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
};

/**
 * Clear error message for a form field
 * @param {HTMLElement} field - The form field element
 */
export const clearFieldError = (field) => {
  field.classList.remove('error');
  const errorElement = field.parentElement?.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }
};

/**
 * Clear all form errors
 * @param {HTMLFormElement} form - The form element
 */
export const clearAllErrors = (form) => {
  if (!form) return;
  const errorFields = form.querySelectorAll('.error');
  errorFields.forEach(field => clearFieldError(field));
};

/**
 * Validate a single form field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateField = (field) => {
  const value = field.value.trim();
  
  if (field.hasAttribute('required') && !value) {
    const label = field.previousElementSibling?.textContent || 'This field';
    showFieldError(field, `${label} is required`);
    return false;
  }

  if (field.id === 'todo-title' && value && value.length < 3) {
    showFieldError(field, 'Title must be at least 3 characters');
    return false;
  }

  clearFieldError(field);
  return true;
};

/**
 * Validate the entire todo form
 * @param {HTMLFormElement} form - The form element
 * @returns {boolean} True if form is valid, false otherwise
 */
export const validateTodoForm = (form) => {
  if (!form) return false;

  let isValid = true;
  const title = form.querySelector('#todo-title');
  const dueDate = form.querySelector('#todo-due-date');

  // Validate title
  if (!title || !title.value.trim()) {
    if (title) showFieldError(title, 'Title is required');
    isValid = false;
  } else if (title.value.trim().length < 3) {
    showFieldError(title, 'Title must be at least 3 characters');
    isValid = false;
  } else {
    clearFieldError(title);
  }

  // Validate due date
  if (!dueDate || !dueDate.value) {
    if (dueDate) showFieldError(dueDate, 'Due date is required');
    isValid = false;
  } else {
    const selectedDate = new Date(dueDate.value);
    if (isNaN(selectedDate.getTime())) {
      showFieldError(dueDate, 'Invalid date');
      isValid = false;
    } else {
      clearFieldError(dueDate);
    }
  }

  return isValid;
};

/**
 * Extract form data into a todo object
 * @param {HTMLFormElement} form - The form element
 * @returns {Object} Todo data object
 */
export const extractFormData = (form) => {
  const formData = new FormData(form);
  return {
    title: formData.get('todo-title').trim(),
    description: formData.get('todo-description').trim(),
    priority: formData.get('todo-priority'),
    status: formData.get('todo-status'),
    dueDate: new Date(formData.get('todo-due-date')).toISOString()
  };
};

