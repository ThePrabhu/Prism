from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.upload import Upload
from app.models.resolution_case import ResolutionCase


class ResolutionEngine:

    @staticmethod
    def run(
        db: Session,
        workspace_id: str,
    ):

        invoices = (
            db.query(Invoice)
            .join(
                Upload,
                Upload.id == Invoice.upload_id,
            )
            .filter(
                Upload.workspace_id == workspace_id
            )
            .all()
        )

        db.query(ResolutionCase).filter(
            ResolutionCase.workspace_id == workspace_id
        ).delete()

        db.commit()

        cases = []

        seen_invoice_numbers = set()

        for invoice in invoices:

            # Rule 1 - Duplicate Invoice
            if invoice.invoice_number in seen_invoice_numbers:

                cases.append(
                    ResolutionCase(
                        workspace_id=workspace_id,
                        invoice_id=invoice.id,
                        issue_type="duplicate_invoice",
                        severity="high",
                        status="open",
                        description="Duplicate invoice detected.",
                        recoverable_amount=invoice.gst_amount,
                    )
                )

            else:
                seen_invoice_numbers.add(
                    invoice.invoice_number
                )

            # Rule 2 - Missing GSTIN
            if not invoice.gstin:

                cases.append(
                    ResolutionCase(
                        workspace_id=workspace_id,
                        invoice_id=invoice.id,
                        issue_type="missing_gstin",
                        severity="critical",
                        status="open",
                        description="GSTIN missing.",
                        recoverable_amount=invoice.gst_amount,
                    )
                )

            # Rule 3 - Zero GST
            if (
                invoice.gst_amount is not None
                and invoice.gst_amount <= 0
            ):

                cases.append(
                    ResolutionCase(
                        workspace_id=workspace_id,
                        invoice_id=invoice.id,
                        issue_type="zero_gst",
                        severity="medium",
                        status="open",
                        description="GST amount is zero.",
                        recoverable_amount=0,
                    )
                )

            # Rule 4 - Taxable Value Missing
            if (
                invoice.taxable_value is None
                or invoice.taxable_value <= 0
            ):

                cases.append(
                    ResolutionCase(
                        workspace_id=workspace_id,
                        invoice_id=invoice.id,
                        issue_type="missing_taxable",
                        severity="medium",
                        status="open",
                        description="Taxable value missing.",
                        recoverable_amount=0,
                    )
                )

        db.add_all(cases)

        db.commit()

        return len(cases)