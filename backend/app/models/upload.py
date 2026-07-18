from uuid import uuid4

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import func


from sqlalchemy.orm import relationship

from app.core.database import Base


class Upload(Base):

    __tablename__ = "uploads"

    # --------------------------------------------------
    # Primary Key
    # --------------------------------------------------

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    # --------------------------------------------------
    # Relationships
    # --------------------------------------------------

    workspace_id = Column(
        String,
        ForeignKey("workspaces.id"),
        nullable=False,
    )

    workspace = relationship(
        "Workspace",
        back_populates="uploads",
    )

    invoices = relationship(
        "Invoice",
        back_populates="upload",
        cascade="all, delete-orphan",
    )

    # --------------------------------------------------
    # File Information
    # --------------------------------------------------

    original_name = Column(
        String,
        nullable=False,
    )

    stored_name = Column(
        String,
        nullable=False,
    )

    storage_path = Column(
        String,
        nullable=False,
    )

    file_type = Column(
        String,
        nullable=False,
    )

    file_size = Column(
        Integer,
        nullable=False,
    )

    parser_used = Column(
        String,
        nullable=True,
    )

    # --------------------------------------------------
    # Processing Status
    # --------------------------------------------------

    status = Column(
        String,
        nullable=False,
        default="uploaded",
    )

    error_message = Column(
        Text,
        nullable=True,
    )

    # --------------------------------------------------
    # Upload Summary
    # --------------------------------------------------

    invoice_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    imported_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    duplicate_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    failed_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    validation_errors = Column(
        Integer,
        default=0,
        nullable=False,
    )

    processing_time_ms = Column(
        Integer,
        default=0,
        nullable=False,
    )

    # --------------------------------------------------
    # Audit
    # --------------------------------------------------

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )