import { format, isPast } from "date-fns";
import { escapeHtml } from "../utils/escape-html.js";

/**
 * Renders a Todo Card component
 * @param {Object} card - The todo object
 * @returns {string} HTML string for the card
 */
export const TodoCard = (card) => {
  const dueDate = new Date(card.dueDate);
  const isOverdue = isPast(dueDate) && card.status !== 'completed';
  const formattedDate = format(dueDate, 'dd.MM.yyyy');
  const safeTitle = escapeHtml(card.title);
  const safeDescription = card.description ? escapeHtml(card.description) : '';

  return `
    <article class="todo-card" data-id="${card.id}" data-priority="${card.priority}" data-status="${card.status}">
      <div class="todo-card-header">
        <h3 class="todo-card-title">${safeTitle}</h3>
        <span class="todo-card-priority ${card.priority}" aria-label="Priority: ${card.priority}">
          ${card.priority}
        </span>
      </div>
      
      ${safeDescription ? `<p class="todo-card-description">${safeDescription}</p>` : ''}
      
      <div class="todo-card-meta">
        <span class="todo-card-status ${card.status}" aria-label="Status: ${card.status}">
          ${card.status.replace('-', ' ')}
        </span>
        <time class="todo-card-due-date ${isOverdue ? 'overdue' : ''}" datetime="${card.dueDate}">
          Due: ${formattedDate}
        </time>
      </div>
      
      <div class="todo-card-actions">
        <button 
          type="button" 
          class="todo-card-button edit" 
          data-action="edit"
          aria-label="Edit task: ${safeTitle}"
        >
          Edit
        </button>
        <button 
          type="button" 
          class="todo-card-button status-toggle" 
          data-action="toggle-status"
          aria-label="Toggle status for task: ${safeTitle}"
        >
          ${card.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button 
          type="button" 
          class="todo-card-button delete" 
          data-action="delete"
          aria-label="Delete task: ${safeTitle}"
        >
          Delete
        </button>
      </div>
    </article>
  `;
};
