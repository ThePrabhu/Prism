from datetime import datetime
from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict


class ResolutionResponse(BaseModel):

    id: UUID

    workspace_id: UUID

    invoice_id: UUID

    issue_type: str

    severity: str

    status: str

    description: str

    recoverable_amount: float

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )