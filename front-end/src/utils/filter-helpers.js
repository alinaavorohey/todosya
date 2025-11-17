/**
 * Filtering and search utilities
 */

/**
 * Filter todos by status
 * @param {Array} todos - Array of todo objects
 * @param {string} status - Status filter ('all' or specific status)
 * @returns {Array} Filtered todos
 */
export const filterByStatus = (todos, status) => {
  if (status === 'all') return todos;
  return todos.filter(todo => todo.status === status);
};

/**
 * Filter todos by priority
 * @param {Array} todos - Array of todo objects
 * @param {string} priority - Priority filter ('all' or specific priority)
 * @returns {Array} Filtered todos
 */
export const filterByPriority = (todos, priority) => {
  if (priority === 'all') return todos;
  return todos.filter(todo => todo.priority === priority);
};

/**
 * Search todos by title and description
 * @param {Array} todos - Array of todo objects
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered todos
 */
export const searchTodos = (todos, searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) return todos;
  
  const term = searchTerm.toLowerCase().trim();
  return todos.filter(todo => 
    todo.title.toLowerCase().includes(term) ||
    (todo.description && todo.description.toLowerCase().includes(term))
  );
};

/**
 * Sort todos by due date
 * @param {Array} todos - Array of todo objects
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted todos
 */
export const sortByDueDate = (todos, order = 'asc') => {
  const sorted = [...todos].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });

  return order === 'desc' ? sorted.reverse() : sorted;
};

/**
 * Apply all filters, search, and sorting to todos
 * @param {Array} todos - Array of todo objects
 * @param {Object} filters - Filter configuration object
 * @param {string} filters.status - Status filter
 * @param {string} filters.priority - Priority filter
 * @param {string} filters.search - Search term
 * @param {string} sortOrder - Sort order ('asc' or 'desc')
 * @returns {Array} Filtered and sorted todos
 */
export const applyAllFilters = (todos, filters, sortOrder = 'asc') => {
  let filtered = [...todos];

  // Apply filters in sequence
  filtered = filterByStatus(filtered, filters.status);
  filtered = filterByPriority(filtered, filters.priority);
  filtered = searchTodos(filtered, filters.search);
  filtered = sortByDueDate(filtered, sortOrder);

  return filtered;
};

