from pydantic import BaseModel


class DashboardSummary(BaseModel):

    total_uploads: int
    total_invoices: int

    open_cases: int
    resolved_cases: int

    critical_cases: int
    high_cases: int
    medium_cases: int
    low_cases: int

    recoverable_gst: float

    compliance_score: float


class RecentUpload(BaseModel):

    id: str
    filename: str
    uploaded_at: str
    invoices: int

    class Config:
        from_attributes = True


class InvoiceStats(BaseModel):

    total: int
    pending: int
    processed: int
    failed: int


class VendorSummary(BaseModel):

    supplier_gstin: str
    invoices: int
    taxable_value: float
    gst_amount: float


class SeveritySummary(BaseModel):

    critical: int
    high: int
    medium: int
    low: int


class ComplianceSummary(BaseModel):

    compliance_score: float
    recoverable_gst: float
    open_cases: int
    resolved_cases: int