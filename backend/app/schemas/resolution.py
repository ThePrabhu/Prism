from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ResolutionCaseBase(BaseModel):

    workspace_id: str

    invoice_id: str

    issue_type: str

    severity: str

    description: str

    recoverable_amount: float


class ResolutionCaseCreate(ResolutionCaseBase):
    pass


class ResolutionCaseUpdate(BaseModel):

    status: Optional[str] = None

    severity: Optional[str] = None

    description: Optional[str] = None

    recoverable_amount: Optional[float] = None


class ResolutionCaseResponse(ResolutionCaseBase):

    id: str

    status: str

    created_at: datetime

    class Config:
        from_attributes = True


class ResolutionFinding(BaseModel):

    invoice_id: str

    issue_type: str

    severity: str

    description: str

    recoverable_amount: float