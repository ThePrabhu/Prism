from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import Index

from sqlalchemy.orm import relationship

from app.core.database import Base


class Invoice(Base):

    __tablename__ = "invoices"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
        index=True,
    )

    upload_id = Column(
        String,
        ForeignKey("uploads.id"),
        nullable=False,
        index=True,
    )

    invoice_number = Column(
        String,
        nullable=False,
        index=True,
    )

    invoice_date = Column(
        String,
        nullable=True,
    )

    supplier_gstin = Column(
        String,
        nullable=True,
        index=True,
    )

    recipient_gstin = Column(
        String,
        nullable=True,
        index=True,
    )

    taxable_value = Column(
        Float,
        default=0,
    )

    gst_amount = Column(
        Float,
        default=0,
    )

    total_amount = Column(
        Float,
        default=0,
    )

    status = Column(
        String,
        default="pending",
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    upload = relationship(
        "Upload",
        back_populates="invoices",
    )

    __table_args__ = (
        Index(
            "idx_invoice_duplicate",
            "supplier_gstin",
            "invoice_number",
            "invoice_date",
        ),
    )