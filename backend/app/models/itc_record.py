from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import func

from sqlalchemy.orm import relationship

from app.core.database import Base


class ITCRecord(Base):

    __tablename__ = "itc_records"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    workspace_id = Column(
        String,
        ForeignKey("workspaces.id"),
        nullable=False,
        index=True,
    )

    invoice_id = Column(
        String,
        ForeignKey("invoices.id"),
        nullable=False,
        unique=True,
        index=True,
    )

    eligibility = Column(
        String,
        nullable=False,
        default="ELIGIBLE",
    )

    reason = Column(
        String,
        nullable=False,
    )

    gst_amount = Column(
        Float,
        default=0,
        nullable=False,
    )

    eligible_amount = Column(
        Float,
        default=0,
        nullable=False,
    )

    blocked_amount = Column(
        Float,
        default=0,
        nullable=False,
    )

    recoverable_amount = Column(
        Float,
        default=0,
        nullable=False,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        server_default=func.now(),
    )

    invoice = relationship(
        "Invoice",
    )

    workspace = relationship(
        "Workspace",
    )