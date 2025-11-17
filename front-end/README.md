# Todo Task Manager - Frontend

A modern, responsive Todo Task Manager web application built with vanilla JavaScript, HTML, and CSS.

## 📋 Project Description

This is a single-page application (SPA) for managing todo tasks. It features:
- ✅ Create, edit, and delete tasks
- 🔍 Search and filter tasks by status and priority
- 📅 Sort tasks by due date
- 📱 Fully responsive design
- ♿ Accessible UI with proper ARIA labels
- 🎨 Modern, clean interface

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### Step 2: Start the Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

The application will be available at: **http://localhost:5173**

### Step 3: Start the Backend Server

**Important:** The frontend requires the backend API to be running.

1. Navigate to the server directory:
```bash
cd ../server
```

2. Activate virtual environment (if using one):
```bash
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # macOS/Linux
```

3. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend should be running at: **http://localhost:8000**

## 🔗 Backend Connection

The frontend is configured to connect to the REST API backend at:
- **Backend URL**: `http://localhost:8000`

If you need to change the backend URL, edit `src/utils/api-helpers.js` and update the `API_BASE_URL` constant.

## 📁 Project Structure

```
zroby-spysok/
├── index.html           # Main HTML file
├── package.json         # Node.js dependencies
├── src/
│   ├── main.js          # Application entry point
│   ├── style.css         # Global styles
│   ├── components/      # UI components
│   │   ├── navbar.js
│   │   ├── add-todo-form.js
│   │   └── todo-card.js
│   ├── scripts/         # Controllers and event handlers
│   │   ├── event-handlers.js
│   │   ├── form-controller.js
│   │   ├── filter-controller.js
│   │   ├── modal-controller.js
│   │   └── todo-controller.js
│   └── utils/           # Utility functions
│       ├── api-helpers.js
│       ├── dom-helpers.js
│       ├── validation.js
│       ├── filter-helpers.js
│       └── escape-html.js
└── public/              # Static assets
```

## 🎨 Building and Modifying the UI

### Development Mode

The project uses **Vite** as the build tool. In development mode:
- Hot Module Replacement (HMR) is enabled
- Changes are reflected immediately in the browser
- No build step required

### Making UI Changes

1. **Styles**: Edit `src/style.css`
   - Uses CSS variables for easy theming
   - Responsive design with media queries
   - Flexbox and Grid layouts

2. **Components**: Edit files in `src/components/`
   - Each component is a JavaScript module
   - Returns HTML strings
   - Can be easily modified or extended

3. **Functionality**: Edit files in `src/scripts/`
   - Controllers handle business logic
   - Event handlers manage user interactions
   - Well-organized and easy to extend

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Features

### Task Management
- **Create**: Click "Add Todo" button to open modal form
- **Edit**: Click "Edit" button on any task card
- **Delete**: Click "Delete" button (with confirmation)
- **Toggle Status**: Click "Mark Complete/Incomplete" button

### Filtering & Search
- **Filter by Status**: Use dropdown to filter by pending/in-progress/completed
- **Filter by Priority**: Use dropdown to filter by low/medium/high
- **Search**: Type in search box to filter by title or description
- **Sort**: Use sort dropdown to order tasks by due date (ascending/descending)

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Touch-friendly buttons and inputs
- Adaptive layouts for different screen sizes

## 🐛 Troubleshooting

### Frontend Won't Load
- Make sure you've run `npm install` first
- Check that port 5173 is not already in use
- Try a different port: `npm run dev -- --port 3000`

### Can't Connect to Backend
- Ensure the backend server is running at `http://localhost:8000`
- Check browser console for CORS errors
- Verify the backend URL in `src/utils/api-helpers.js`

### Tasks Not Loading
- Check browser console for errors
- Verify backend is running and accessible
- Check network tab in browser DevTools

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache if needed

## 🔧 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables, Flexbox, Grid
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JS modules
- **Vite** - Build tool and dev server
- **date-fns** - Date formatting library

## 📝 Code Style

- ES6 modules for code organization
- JSDoc comments for documentation
- Consistent naming conventions
- Separation of concerns (components, scripts, utils)

## 🚀 Deployment

For production deployment:

1. Build the project:
```bash
npm run build
```

2. Serve the `dist/` directory with any static file server:
   - Nginx
   - Apache
   - Vercel
   - Netlify
   - GitHub Pages

3. Make sure the backend API is accessible from your deployment URL (update CORS settings if needed).

## 📄 License

This project is part of a lab work assignment.

