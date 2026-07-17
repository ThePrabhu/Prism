from datetime import datetime
from uuid import uuid4

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import String

from app.core.database import Base


class ResolutionCase(Base):

    __tablename__ = "resolution_cases"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid4()),
    )

    workspace_id = Column(
        String,
        ForeignKey("workspaces.id"),
        nullable=False,
    )

    invoice_id = Column(
        String,
        ForeignKey("invoices.id"),
        nullable=False,
    )

    issue_type = Column(String)

    severity = Column(String)

    status = Column(
        String,
        default="open",
    )

    description = Column(String)

    recoverable_amount = Column(Float)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )