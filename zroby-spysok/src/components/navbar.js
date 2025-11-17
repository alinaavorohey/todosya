/**
 * Renders the Navigation Bar component
 * @returns {string} HTML string for the navbar
 */
export const Navbar = () => `
  <header class="navbar" role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <div class="navbar-content">
        <h1 class="navbar-title">Todosia</h1>
        <button 
          class="btn btn-primary navbar-add-btn" 
          id="open-modal-btn"
          type="button"
          aria-label="Add new todo"
          aria-haspopup="dialog"
        >
          Add Todo
        </button>
      </div>
    </nav>
  </header>
`;
