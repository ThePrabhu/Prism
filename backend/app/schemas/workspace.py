from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import relationship

from app.core.database import Base


class Workspace(Base):

    __tablename__ = "workspaces"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
        index=True,
    )

    name = Column(
        String,
        nullable=False,
    )

    owner_id = Column(
        String,
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    owner = relationship(
        "User",
        back_populates="workspaces",
    )

    uploads = relationship(
        "Upload",
        back_populates="workspace",
        cascade="all, delete-orphan",
    )