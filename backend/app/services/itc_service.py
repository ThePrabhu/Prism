from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.upload import Upload
from app.models.itc_record import ITCRecord

from app.services.itc_engine import ITCEngine

from app.services.case_service import CaseService

class ITCService:

    @staticmethod
    def run(
        db: Session,
        workspace_id,
    ):

        invoices = (
            db.query(Invoice)
            .join(
                Upload,
                Invoice.upload_id == Upload.id,
            )
            .filter(
                Upload.workspace_id == workspace_id,
            )
            .all()
        )

        processed = 0
        created = 0
        skipped = 0

        eligible = 0
        blocked = 0
        partial = 0

        eligible_gst = 0.0
        blocked_gst = 0.0
        recoverable_gst = 0.0

        duplicate_ids = ITCService._find_duplicate_invoice_ids(
            invoices
        )

        for invoice in invoices:

            processed += 1

            existing = (
                db.query(ITCRecord)
                .filter(
                    ITCRecord.invoice_id == invoice.id
                )
                .first()
            )

            if existing:

                skipped += 1
                continue

            finding = ITCEngine.analyze_invoice(
                invoice,
                duplicate=invoice.id in duplicate_ids,
            )

            record = ITCRecord(

                workspace_id=workspace_id,

                invoice_id=invoice.id,

                eligibility=finding.eligibility,

                reason=finding.reason,

                gst_amount=finding.gst_amount,

                eligible_amount=finding.eligible_amount,

                blocked_amount=finding.blocked_amount,

                recoverable_amount=finding.recoverable_amount,
            )

            db.add(record)

            created += 1

            if finding.eligibility == "ELIGIBLE":

                eligible += 1

            elif finding.eligibility == "BLOCKED":

                blocked += 1

            else:

                partial += 1

            eligible_gst += finding.eligible_amount

            blocked_gst += finding.blocked_amount

            recoverable_gst += finding.recoverable_amount

        db.commit()

        CaseService.generate(
            db=db,
            workspace_id=workspace_id,
        )

        return {

            "processed": processed,

            "created": created,

            "skipped": skipped,

            "eligible": eligible,

            "blocked": blocked,

            "partial": partial,

            "eligible_gst": round(
                eligible_gst,
                2,
            ),

            "blocked_gst": round(
                blocked_gst,
                2,
            ),

            "recoverable_gst": round(
                recoverable_gst,
                2,
            ),

        }

    # -----------------------------------------------------
    # Duplicate Detection
    # -----------------------------------------------------

    @staticmethod
    def _find_duplicate_invoice_ids(
        invoices,
    ):

        seen = {}

        duplicates = set()

        for invoice in invoices:

            key = (

                invoice.supplier_gstin,

                invoice.invoice_number,

                invoice.invoice_date,

            )

            if key in seen:

                duplicates.add(invoice.id)

                duplicates.add(
                    seen[key]
                )

            else:

                seen[key] = invoice.id

        return duplicates
    # -----------------------------------------------------
    # Get All ITC Records
    # -----------------------------------------------------

    @staticmethod
    def get_all(
        db: Session,
        workspace_id,
    ):

        return (
            db.query(ITCRecord)
            .filter(
                ITCRecord.workspace_id == workspace_id
            )
            .order_by(
                ITCRecord.created_at.desc()
            )
            .all()
        )

    # -----------------------------------------------------
    # Get ITC Record By Invoice
    # -----------------------------------------------------

    @staticmethod
    def get_by_invoice(
        db: Session,
        invoice_id: str,
    ):

        return (
            db.query(ITCRecord)
            .filter(
                ITCRecord.invoice_id == invoice_id
            )
            .first()
        )

    # -----------------------------------------------------
    # Delete ITC Record
    # -----------------------------------------------------

    @staticmethod
    def delete(
        db: Session,
        invoice_id: str,
    ):

        record = (
            db.query(ITCRecord)
            .filter(
                ITCRecord.invoice_id == invoice_id
            )
            .first()
        )

        if not record:

            return False

        db.delete(record)

        db.commit()

        return True

    # -----------------------------------------------------
    # Workspace Summary
    # -----------------------------------------------------

    @staticmethod
    def get_summary(
        db: Session,
        workspace_id,
    ):

        records = (
            db.query(ITCRecord)
            .filter(
                ITCRecord.workspace_id == workspace_id
            )
            .all()
        )

        eligible = 0
        blocked = 0
        partial = 0

        eligible_gst = 0.0
        blocked_gst = 0.0
        recoverable_gst = 0.0

        for record in records:

            if record.eligibility == "ELIGIBLE":

                eligible += 1

            elif record.eligibility == "BLOCKED":

                blocked += 1

            else:

                partial += 1

            eligible_gst += record.eligible_amount

            blocked_gst += record.blocked_amount

            recoverable_gst += (
                record.recoverable_amount
            )

        total_records = len(records)

        return {

            "total_records": total_records,

            "eligible": eligible,

            "blocked": blocked,

            "partial": partial,

            "eligible_gst": round(
                eligible_gst,
                2,
            ),

            "blocked_gst": round(
                blocked_gst,
                2,
            ),

            "recoverable_gst": round(
                recoverable_gst,
                2,
            ),

            "compliance_score":
                ITCService._compliance_score(
                    total_records,
                    eligible,
                ),

            "recovery_rate":
                ITCService._recovery_rate(
                    recoverable_gst,
                    blocked_gst,
                ),

        }

    # -----------------------------------------------------
    # Compliance Score
    # -----------------------------------------------------

    @staticmethod
    def _compliance_score(
        total_records: int,
        eligible: int,
    ):

        if total_records == 0:

            return 100.0

        return round(

            (eligible / total_records) * 100,

            2,

        )

    # -----------------------------------------------------
    # Recovery Rate
    # -----------------------------------------------------

    @staticmethod
    def _recovery_rate(
        recoverable_gst: float,
        blocked_gst: float,
    ):

        if blocked_gst == 0:

            return 100.0

        recovered = blocked_gst - recoverable_gst

        if recovered < 0:

            recovered = 0

        return round(

            (recovered / blocked_gst) * 100,

            2,

        )