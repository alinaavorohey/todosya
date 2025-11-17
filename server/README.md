# Todo Task Manager API - Backend

FastAPI REST API backend for the Todo Task Manager application.

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

## 🚀 Quick Start

### Step 1: Create a Virtual Environment (Recommended)

It's best practice to use a virtual environment to isolate project dependencies:

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

You should see `(.venv)` in your terminal prompt when the virtual environment is active.

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `sqlalchemy` - Database ORM
- `pydantic` - Data validation

### Step 3: Run the Server

```bash
uvicorn main:app --reload
```

The `--reload` flag enables auto-reload on code changes (useful for development).

The API will be available at: **http://localhost:8000**

## 📚 API Documentation

Once the server is running, you can access interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

These pages allow you to test all endpoints directly from your browser.

## 🔌 API Endpoints

### Get All Tasks
```
GET /tasks
```
Returns a list of all tasks.

**Query Parameters:**
- `skip` (optional): Number of tasks to skip (default: 0)
- `limit` (optional): Maximum number of tasks to return (default: 100)

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Buy groceries",
    "description": "Milk, Cheese, Pizza",
    "priority": "low",
    "dueDate": "2025-05-20T10:30:00.000Z",
    "status": "pending"
  }
]
```

### Get Single Task
```
GET /tasks/{id}
```
Returns a single task by ID.

**Example:**
```
GET /tasks/1
```

### Create Task
```
POST /tasks
```
Creates a new task.

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the todo app",
  "priority": "high",
  "dueDate": "2025-01-25T12:00:00.000Z",
  "status": "pending"
}
```

**Valid Values:**
- `priority`: "low", "medium", or "high"
- `status`: "pending", "in-progress", or "completed"

### Update Task
```
PUT /tasks/{id}
```
Updates an existing task. All fields are optional - only include fields you want to update.

**Request Body:**
```json
{
  "status": "completed"
}
```

### Delete Task
```
DELETE /tasks/{id}
```
Deletes a task by ID.

## 💾 Database

The application uses **SQLite** with SQLAlchemy ORM.

- Database file: `todos.db` (created automatically in the server directory)
- Tables are created automatically on first run
- No additional database setup required

## 🔧 Project Structure

```
server/
├── main.py              # FastAPI application entry point
├── database.py          # Database configuration and session management
├── models.py            # SQLAlchemy database models
├── schemas.py           # Pydantic schemas for request/response validation
├── requirements.txt     # Python dependencies
├── routers/
│   └── tasks.py         # Task CRUD endpoints
└── todos.db            # SQLite database (created automatically)
```

## 🌐 CORS Configuration

CORS (Cross-Origin Resource Sharing) is configured to allow requests from:
- http://localhost:5173 (Vite default port)
- http://localhost:3000 (Alternative dev port)
- http://127.0.0.1:5173
- http://127.0.0.1:3000

## 🐛 Troubleshooting

### Port Already in Use
If port 8000 is already in use, you can specify a different port:
```bash
uvicorn main:app --reload --port 8001
```

### Module Not Found Error
Make sure you're in the `server` directory and have activated your virtual environment:
```bash
cd server
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # macOS/Linux
```

### Database Errors
If you encounter database errors, you can delete `todos.db` and restart the server. The database will be recreated automatically.

### Import Errors
Make sure all dependencies are installed:
```bash
pip install -r requirements.txt
```

## 📝 Example API Calls

### Using cURL

**Get all tasks:**
```bash
curl http://localhost:8000/tasks
```

**Create a task:**
```bash
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","description":"Testing","priority":"medium","dueDate":"2025-12-31T00:00:00.000Z","status":"pending"}'
```

**Update a task:**
```bash
curl -X PUT http://localhost:8000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:8000/tasks/1
```

## 🔗 Frontend Integration

The frontend application (in `/zroby-spysok`) is configured to connect to this API at `http://localhost:8000`.

Make sure the backend server is running before starting the frontend application.
