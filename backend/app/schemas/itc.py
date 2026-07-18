from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class ITCBase(BaseModel):

    eligibility: str

    reason: str

    gst_amount: float

    eligible_amount: float

    blocked_amount: float

    recoverable_amount: float


class ITCCreate(ITCBase):

    invoice_id: str

    workspace_id: UUID


class ITCUpdate(BaseModel):

    eligibility: str | None = None

    reason: str | None = None


class ITCResponse(ITCBase):

    id: str

    invoice_id: str

    workspace_id: UUID

    created_at: datetime

    class Config:

        from_attributes = True


class ITCSummary(BaseModel):

    total_records: int

    eligible: int

    blocked: int

    partial: int

    eligible_gst: float

    blocked_gst: float

    recoverable_gst: float