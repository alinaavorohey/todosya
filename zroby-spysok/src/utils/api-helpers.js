/**
 * API helper utilities
 * REST API integration for todo tasks
 */

const API_BASE_URL = 'http://localhost:8000';

/**
 * Load todos from REST API
 * @returns {Promise<Array>} Array of todos
 */
export const loadTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error loading todos:', error);
    throw error;
  }
};

/**
 * Create a new todo
 * @param {Object} todoData - Todo data object
 * @returns {Promise<Object>} Created todo with ID
 */
export const createTodo = async (todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

/**
 * Update an existing todo
 * @param {string|number} id - Todo ID
 * @param {Object} todoData - Updated todo data
 * @returns {Promise<Object>} Updated todo
 */
export const updateTodo = async (id, todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

/**
 * Delete a todo
 * @param {string|number} id - Todo ID
 * @returns {Promise<void>}
 */
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return Promise.resolve();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
