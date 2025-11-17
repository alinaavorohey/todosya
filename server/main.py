"""
FastAPI main application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import tasks

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="Todo Task Manager API",
    description="REST API for managing todo tasks",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",   # Alternative dev port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tasks.router)


@app.get("/")
async def root():
    """
    Root endpoint
    """
    return {
        "message": "Todo Task Manager API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"}
