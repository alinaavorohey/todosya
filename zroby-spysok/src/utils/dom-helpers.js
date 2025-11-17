/**
 * DOM helper utilities
 */

/**
 * Safely query a single element
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (defaults to document)
 * @returns {Element|null} Found element or null
 */
export const $ = (selector, parent = document) => {
  return parent.querySelector(selector);
};

/**
 * Safely query multiple elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (defaults to document)
 * @returns {NodeList} Found elements
 */
export const $$ = (selector, parent = document) => {
  return parent.querySelectorAll(selector);
};

/**
 * Wait for an element to appear in the DOM
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<Element>} Found element
 */
export const waitForElement = (selector, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const element = $(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      const element = $(selector);
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Element ${selector} not found within ${timeout}ms`));
    }, timeout);
  });
};

