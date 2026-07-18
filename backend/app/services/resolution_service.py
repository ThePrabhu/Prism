from collections import Counter

from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.resolution_case import ResolutionCase
from app.services.resolution_engine import ResolutionEngine


class ResolutionService:

    @staticmethod
    def run(db: Session):

        invoices = db.query(Invoice).all()

        findings = ResolutionEngine.analyze_invoices(
            invoices
        )

        created = 0
        skipped = 0

        severity_counter = Counter()

        invoice_lookup = {
            invoice.id: invoice
            for invoice in invoices
        }

        for finding in findings:

            invoice = invoice_lookup.get(
                finding.invoice_id
            )

            if invoice is None:
                continue

            existing = (

                db.query(
                    ResolutionCase
                )

                .filter(

                    ResolutionCase.invoice_id
                    == finding.invoice_id,

                    ResolutionCase.issue_type
                    == finding.issue_type,

                    ResolutionCase.status
                    == "open",

                )

                .first()

            )

            if existing:

                skipped += 1
                continue

            workspace_id = None

            if invoice.upload:
                workspace_id = (
                    invoice.upload.workspace_id
                )

            case = ResolutionCase(

                workspace_id=workspace_id,

                invoice_id=finding.invoice_id,

                issue_type=finding.issue_type,

                severity=finding.severity,

                description=finding.description,

                recoverable_amount=(
                    finding.recoverable_amount
                ),

            )

            db.add(case)

            created += 1

            severity_counter[
                finding.severity
            ] += 1

        db.commit()

        return {

            "invoices_processed":
                len(invoices),

            "findings":
                len(findings),

            "cases_created":
                created,

            "duplicates_skipped":
                skipped,

            "critical":
                severity_counter.get(
                    "CRITICAL",
                    0,
                ),

            "high":
                severity_counter.get(
                    "HIGH",
                    0,
                ),

            "medium":
                severity_counter.get(
                    "MEDIUM",
                    0,
                ),

            "low":
                severity_counter.get(
                    "LOW",
                    0,
                ),

        }

    @staticmethod
    def get_all(db: Session):

        return (

            db.query(
                ResolutionCase
            )

            .order_by(
                ResolutionCase.created_at.desc()
            )

            .all()

        )

    @staticmethod
    def get_by_id(
        db: Session,
        case_id: str,
    ):

        return (

            db.query(
                ResolutionCase
            )

            .filter(
                ResolutionCase.id == case_id
            )

            .first()

        )

    @staticmethod
    def update_status(
        db: Session,
        case_id: str,
        status: str,
    ):

        case = ResolutionService.get_by_id(
            db,
            case_id,
        )

        if case is None:
            return None

        case.status = status

        db.commit()

        db.refresh(case)

        return case

    @staticmethod
    def delete(
        db: Session,
        case_id: str,
    ):

        case = ResolutionService.get_by_id(
            db,
            case_id,
        )

        if case is None:
            return False

        db.delete(case)

        db.commit()

        return True