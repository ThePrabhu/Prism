import uuid

from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.itc_record import ITCRecord
from app.models.resolution_case import ResolutionCase


class CaseService:

    @staticmethod
    def generate(
        db: Session,
        workspace_id: str,
    ):

        invoices = (
            db.query(Invoice)
            .filter(
                Invoice.upload.has(
                    workspace_id=workspace_id
                )
            )
            .all()
        )

        created = 0

        for invoice in invoices:

            itc = (
                db.query(ITCRecord)
                .filter(
                    ITCRecord.invoice_id == invoice.id
                )
                .first()
            )

            if not itc:
                continue

            if (
                float(itc.blocked_amount or 0) > 0
                or float(itc.recoverable_amount or 0) > 0
            ):

                exists = (
                    db.query(ResolutionCase)
                    .filter(
                        ResolutionCase.invoice_id == invoice.id
                    )
                    .first()
                )

                if exists:
                    continue

                case = ResolutionCase(

                    id=str(uuid.uuid4()),

                    workspace_id=workspace_id,

                    invoice_id=invoice.id,

                    severity="HIGH",

                    issue_type=itc.reason,
                    description=itc.reason,
                    
                    recoverable_amount=float(itc.recoverable_amount or 0),
                    
                    status="open",

                )

                db.add(case)

                created += 1

        db.commit()

        return {

            "cases_created": created

        }