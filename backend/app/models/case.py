from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.sql import func

from app.core.database import Base


class ComplianceCase(Base):

    __tablename__ = "compliance_cases"

    id = Column(String, primary_key=True)

    workspace_id = Column(String, nullable=False)

    invoice_id = Column(
        String,
        ForeignKey("invoices.id"),
        nullable=False,
    )

    severity = Column(String, nullable=False)

    status = Column(
        String,
        default="OPEN",
    )

    title = Column(String)

    description = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )