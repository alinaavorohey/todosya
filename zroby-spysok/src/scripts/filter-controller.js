/**
 * Filter controller - handles filtering, searching, and sorting
 */
import { $ } from '../utils/dom-helpers.js';

/**
 * Filter controller class
 */
export class FilterController {
  constructor(app) {
    this.app = app;
  }

  /**
   * Handle status filter change
   * @param {Event} e - Change event
   */
  handleStatusFilter(e) {
    this.app.filters.status = e.target.value;
    this.app.applyFilters();
  }

  /**
   * Handle priority filter change
   * @param {Event} e - Change event
   */
  handlePriorityFilter(e) {
    this.app.filters.priority = e.target.value;
    this.app.applyFilters();
  }

  /**
   * Handle search input
   * @param {Event} e - Input event
   */
  handleSearch(e) {
    this.app.filters.search = e.target.value.toLowerCase().trim();
    this.app.applyFilters();
  }

  /**
   * Handle sort order change
   * @param {Event} e - Change event
   */
  handleSortOrder(e) {
    this.app.sortOrder = e.target.value;
    this.app.applyFilters();
  }

  /**
   * Attach filter event listeners
   */
  attachListeners() {
    const filterStatus = $('#filter-status');
    const filterPriority = $('#filter-priority');
    const searchInput = $('#search-input');
    const sortOrder = $('#sort-order');

    if (filterStatus) {
      filterStatus.addEventListener('change', (e) => this.handleStatusFilter(e));
    }

    if (filterPriority) {
      filterPriority.addEventListener('change', (e) => this.handlePriorityFilter(e));
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e));
    }

    if (sortOrder) {
      sortOrder.addEventListener('change', (e) => this.handleSortOrder(e));
    }
  }
}

