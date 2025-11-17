"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, Field
from typing import Optional, Literal


class TaskBase(BaseModel):
    """Base schema with common task fields"""
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: Literal["low", "medium", "high"]
    dueDate: str  # ISO date string
    status: Literal["pending", "in-progress", "completed"]

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Buy groceries",
                "description": "Milk, Cheese, Pizza, Fruit",
                "priority": "low",
                "dueDate": "2025-05-20T10:30:00.000Z",
                "status": "pending"
            }
        }


class TaskCreate(TaskBase):
    """Schema for creating a new task"""
    pass


class TaskUpdate(BaseModel):
    """Schema for updating a task (all fields optional)"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: Optional[Literal["low", "medium", "high"]] = None
    dueDate: Optional[str] = None
    status: Optional[Literal["pending", "in-progress", "completed"]] = None


class Task(TaskBase):
    """Schema for task response (includes id)"""
    id: int

    class Config:
        from_attributes = True  # Allows conversion from SQLAlchemy models

