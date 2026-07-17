from pydantic import BaseModel


class DashboardSummary(BaseModel):

    total_invoices: int

    total_uploads: int

    total_vendors: int

    blocked_itc: float

    recoverable_itc: float

    total_taxable: float

    total_gst: float

    risk_score: int