from dataclasses import dataclass

from app.models.invoice import Invoice


ELIGIBLE = "ELIGIBLE"
PARTIAL = "PARTIAL"
BLOCKED = "BLOCKED"


@dataclass
class ITCFinding:

    eligibility: str

    reason: str

    gst_amount: float

    eligible_amount: float

    blocked_amount: float

    recoverable_amount: float


class ITCEngine:

    @staticmethod
    def analyze_invoice(
        invoice: Invoice,
        *,
        duplicate: bool = False,
    ) -> ITCFinding:

        taxable = float(invoice.taxable_value or 0)

        gst = float(invoice.gst_amount or 0)

        if gst <= 0:

            return ITCFinding(
                eligibility=BLOCKED,
                reason="GST amount is zero.",
                gst_amount=gst,
                eligible_amount=0,
                blocked_amount=gst,
                recoverable_amount=0,
            )

        if taxable <= 0:

            return ITCFinding(
                eligibility=BLOCKED,
                reason="Taxable value is zero.",
                gst_amount=gst,
                eligible_amount=0,
                blocked_amount=gst,
                recoverable_amount=0,
            )

        if not invoice.supplier_gstin:

            return ITCFinding(
                eligibility=BLOCKED,
                reason="Supplier GSTIN missing.",
                gst_amount=gst,
                eligible_amount=0,
                blocked_amount=gst,
                recoverable_amount=0,
            )

        if not invoice.recipient_gstin:

            return ITCFinding(
                eligibility=BLOCKED,
                reason="Recipient GSTIN missing.",
                gst_amount=gst,
                eligible_amount=0,
                blocked_amount=gst,
                recoverable_amount=0,
            )

        if duplicate:

            return ITCFinding(
                eligibility=BLOCKED,
                reason="Duplicate invoice.",
                gst_amount=gst,
                eligible_amount=0,
                blocked_amount=gst,
                recoverable_amount=0,
            )

        if gst > taxable:

            recoverable = gst - taxable

            return ITCFinding(
                eligibility=PARTIAL,
                reason="GST exceeds taxable value.",
                gst_amount=gst,
                eligible_amount=taxable,
                blocked_amount=recoverable,
                recoverable_amount=recoverable,
            )

        return ITCFinding(
            eligibility=ELIGIBLE,
            reason="Eligible for ITC.",
            gst_amount=gst,
            eligible_amount=gst,
            blocked_amount=0,
            recoverable_amount=0,
        )

    @staticmethod
    def analyze_invoices(
        invoices: list[Invoice],
        duplicates: set[str] | None = None,
    ) -> list[ITCFinding]:

        duplicates = duplicates or set()

        findings: list[ITCFinding] = []

        for invoice in invoices:

            findings.append(
                ITCEngine.analyze_invoice(
                    invoice,
                    duplicate=invoice.id in duplicates,
                )
            )

        return findings