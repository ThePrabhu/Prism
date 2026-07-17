from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class UploadResponse(BaseModel):
    id: UUID
    workspace_id: UUID

    original_name: str
    stored_name: str

    file_size: str

    status: str

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )