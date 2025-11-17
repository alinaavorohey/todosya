/**
 * ID generation utilities
 */

/**
 * Generate a simple timestamp-based ID
 * @returns {string} Generated ID
 */
export const generateId = () => {
  return Date.now().toString();
};

/**
 * Generate a UUID v4 (if uuid package is available)
 * @returns {string} Generated UUID
 */
export const generateUUID = () => {
  // Simple UUID v4 implementation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

