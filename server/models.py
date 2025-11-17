"""
SQLAlchemy models
"""
from sqlalchemy import Column, Integer, String, Date
from database import Base


class Task(Base):
    """
    Task model representing a todo item in the database
    """
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=True)
    priority = Column(String, nullable=False)  # "low", "medium", "high"
    dueDate = Column(String, nullable=False)  # Stored as ISO string
    status = Column(String, nullable=False)  # "pending", "in-progress", "completed"

