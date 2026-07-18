from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CaseResponse(BaseModel):
    id: str
    workspace_id: str
    invoice_id: str

    issue_type: Optional[str] = None
    severity: Optional[str] = None
    status: Optional[str] = None

    description: Optional[str] = None
    recoverable_amount: Optional[float] = 0

    created_at: datetime

    class Config:
        from_attributes = True


class CaseUpdate(BaseModel):
    status: str