from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.database import Base


class Upload(Base):

    __tablename__ = "uploads"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
        index=True,
    )

    workspace_id = Column(
        String,
        ForeignKey("workspaces.id"),
        nullable=False,
        index=True,
    )

    workspace = relationship(
    "Workspace",
    back_populates="uploads",
    )

    original_name = Column(String, nullable=False)

    stored_name = Column(String, nullable=False)

    file_type = Column(String, nullable=False)

    storage_path = Column(String, nullable=False)

    file_size = Column(String, nullable=False)

    parser_used = Column(
        String,
        default="pending",
    )

    status = Column(
        String,
        default="uploaded",
    )

    invoice_count = Column(
        Integer,
        default=0,
    )

    processing_time_ms = Column(
        Integer,
        default=0,
    )

    error_message = Column(
        String,
        default="",
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    invoices = relationship(
        "Invoice",
        back_populates="upload",
        cascade="all, delete-orphan",
    )