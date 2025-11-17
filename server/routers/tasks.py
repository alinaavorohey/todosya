"""
Task router - CRUD endpoints for tasks
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Task as TaskModel  # SQLAlchemy model
from schemas import TaskCreate, TaskUpdate, Task  # Pydantic schemas

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=List[Task], status_code=status.HTTP_200_OK)
def get_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all tasks
    """
    tasks = db.query(TaskModel).offset(skip).limit(limit).all()
    return tasks


@router.get("/{task_id}", response_model=Task, status_code=status.HTTP_200_OK)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """
    Get a single task by ID
    """
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )
    return task


@router.post("", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task
    """
    db_task = TaskModel(
        title=task.title,
        description=task.description,
        priority=task.priority,
        dueDate=task.dueDate,
        status=task.status
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.put("/{task_id}", response_model=Task, status_code=status.HTTP_200_OK)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    """
    Update an existing task
    """
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )
    
    # Update only provided fields
    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Delete a task
    """
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if not db_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )
    
    db.delete(db_task)
    db.commit()
    return None

