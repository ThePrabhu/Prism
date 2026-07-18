from datetime import datetime
from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict


# --------------------------------------------------
# Base Upload Schema
# --------------------------------------------------

class UploadBase(BaseModel):

    workspace_id: UUID

    original_name: str

    stored_name: str

    storage_path: str

    file_type: str

    file_size: int

    parser_used: str | None = None

    status: str

    error_message: str | None = None

    invoice_count: int = 0

    imported_count: int = 0

    duplicate_count: int = 0

    failed_count: int = 0

    validation_errors: int = 0

    processing_time_ms: int = 0


# --------------------------------------------------
# Create Upload
# --------------------------------------------------

class UploadCreate(UploadBase):
    pass


# --------------------------------------------------
# Update Upload
# --------------------------------------------------

class UploadUpdate(BaseModel):

    status: str | None = None

    parser_used: str | None = None

    error_message: str | None = None

    invoice_count: int | None = None

    imported_count: int | None = None

    duplicate_count: int | None = None

    failed_count: int | None = None

    validation_errors: int | None = None

    processing_time_ms: int | None = None


# --------------------------------------------------
# Upload Response
# --------------------------------------------------

class UploadResponse(UploadBase):

    id: UUID

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)