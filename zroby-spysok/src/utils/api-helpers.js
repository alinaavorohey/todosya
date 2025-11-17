/**
 * API helper utilities
 * Designed to be easily replaceable with REST API calls in future labs
 */

/**
 * Load todos from data source
 * @param {string} url - URL to fetch data from
 * @returns {Promise<Array>} Array of todos
 */
export const loadTodos = async (url = '/data/data.json') => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.todos || [];
  } catch (error) {
    console.error('Error loading todos:', error);
    throw error;
  }
};

/**
 * Create a new todo
 * TODO: Replace with POST request to REST API
 * @param {Object} todoData - Todo data object
 * @returns {Promise<Object>} Created todo with ID
 */
export const createTodo = async (todoData) => {
  // For now, just generate ID locally
  // In future: POST to API endpoint
  return {
    id: Date.now().toString(),
    ...todoData
  };
};

/**
 * Update an existing todo
 * TODO: Replace with PUT/PATCH request to REST API
 * @param {string} id - Todo ID
 * @param {Object} todoData - Updated todo data
 * @returns {Promise<Object>} Updated todo
 */
export const updateTodo = async (id, todoData) => {
  // In future: PUT/PATCH to API endpoint
  return {
    id,
    ...todoData
  };
};

/**
 * Delete a todo
 * TODO: Replace with DELETE request to REST API
 * @param {string} id - Todo ID
 * @returns {Promise<void>}
 */
export const deleteTodo = async (id) => {
  // In future: DELETE to API endpoint
  return Promise.resolve();
};

