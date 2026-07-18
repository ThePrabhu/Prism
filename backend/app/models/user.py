from uuid import uuid4

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
        index=True,
    )

    email = Column(
        String,
        nullable=False,
        unique=True,
        index=True,
    )

    full_name = Column(
        String,
        nullable=True,
    )

    workspaces = relationship(
        "Workspace",
        back_populates="owner",
        cascade="all, delete-orphan",
    )