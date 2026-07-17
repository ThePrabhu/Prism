from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.upload import Upload
from app.models.resolution_case import (
    ResolutionCase,
)


class ResolutionService:

    @staticmethod
    def generate_cases(
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

        created = []

        for invoice in invoices:

            if (
                invoice.gst_amount is None
                or invoice.gst_amount <= 0
            ):

                continue

            severity = (
                "critical"
                if invoice.gst_amount > 10000
                else "medium"
            )

            case = ResolutionCase(

                workspace_id=workspace_id,

                invoice_id=invoice.id,

                issue_type="gst_review",

                severity=severity,

                status="open",

                description=(
                    "GST amount requires verification."
                ),

                recoverable_amount=invoice.gst_amount,

            )

            db.add(case)

            created.append(case)

        db.commit()

        return created

    @staticmethod
    def list_cases(
        db: Session,
        workspace_id: str,
    ):

        return (
            db.query(ResolutionCase)
            .filter(
                ResolutionCase.workspace_id
                == workspace_id
            )
            .all()
        )