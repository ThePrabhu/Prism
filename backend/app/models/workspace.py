from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import DateTime

from sqlalchemy.orm import relationship

from datetime import datetime

from app.core.database import Base


class Workspace(Base):

    __tablename__ = "workspaces"

    id = Column(
        String,
        primary_key=True,
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
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    owner = relationship(
        "User",
        back_populates="workspaces",
    )