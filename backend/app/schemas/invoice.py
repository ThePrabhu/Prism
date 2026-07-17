from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class InvoiceResponse(BaseModel):

    id: UUID

    upload_id: UUID

    invoice_number: str | None = None

    invoice_date: str | None = None

    buyer_name: str | None = None

    seller_name: str | None = None

    gstin: str | None = None

    taxable_value: float | None = None

    gst_amount: float | None = None

    total_amount: float | None = None

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )