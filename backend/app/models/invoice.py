from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import String

from sqlalchemy.orm import relationship

from app.core.database import Base


class Invoice(Base):

    __tablename__ = "invoices"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    upload_id = Column(
        String,
        ForeignKey("uploads.id"),
        nullable=False,
    )

    invoice_number = Column(String)

    invoice_date = Column(String)

    buyer_name = Column(String)

    seller_name = Column(String)

    gstin = Column(String)

    taxable_value = Column(Float)

    gst_amount = Column(Float)

    total_amount = Column(Float)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    upload = relationship(
        "Upload",
        back_populates="invoices",
    )