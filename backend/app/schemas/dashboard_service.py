from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.upload import Upload
from app.models.resolution_case import ResolutionCase


class DashboardService:

    @staticmethod
    def get_summary(
        db: Session,
        workspace_id: str,
    ):

        total_uploads = (
            db.query(Upload)
            .filter(
                Upload.workspace_id == workspace_id
            )
            .count()
        )

        invoices = (
            db.query(Invoice)
            .join(
                Upload,
                Upload.id == Invoice.upload_id,
            )
            .filter(
                Upload.workspace_id == workspace_id
            )
        )

        total_invoices = invoices.count()

        total_taxable = (
            invoices.with_entities(
                func.coalesce(
                    func.sum(
                        Invoice.taxable_value
                    ),
                    0,
                )
            ).scalar()
        )

        total_gst = (
            invoices.with_entities(
                func.coalesce(
                    func.sum(
                        Invoice.gst_amount
                    ),
                    0,
                )
            ).scalar()
        )

        total_vendors = (
            invoices.with_entities(
                Invoice.seller_name
            )
            .distinct()
            .count()
        )

        blocked_itc = total_gst * 0.20

        recoverable_itc = (
            total_gst - blocked_itc
        )

        open_cases = (
            db.query(ResolutionCase)
            .filter(
                ResolutionCase.workspace_id == workspace_id,
                ResolutionCase.status == "open",
            )
            .count()
        )

        resolved_cases = (
            db.query(ResolutionCase)
            .filter(
                ResolutionCase.workspace_id == workspace_id,
                ResolutionCase.status == "resolved",
            )
            .count()
        )

        critical_cases = (
            db.query(ResolutionCase)
            .filter(
                ResolutionCase.workspace_id == workspace_id,
                ResolutionCase.severity == "CRITICAL",
            )
            .count()
        )

        high_cases = (
            db.query(ResolutionCase)
            .filter(
                ResolutionCase.workspace_id == workspace_id,
                ResolutionCase.severity == "HIGH",
            )
            .count()
        )

        medium_cases = (
            db.query(ResolutionCase)
            .filter(
                ResolutionCase.workspace_id == workspace_id,
                ResolutionCase.severity == "MEDIUM",
            )
            .count()
        )

        low_cases = (
            db.query(ResolutionCase)
            .filter(
                ResolutionCase.workspace_id == workspace_id,
                ResolutionCase.severity == "LOW",
            )
            .count()
        )

        recoverable_gst = (
            db.query(
                func.coalesce(
                    func.sum(
                        ResolutionCase.recoverable_amount
                    ),
                    0,
                )
            )
            .filter(
                ResolutionCase.workspace_id == workspace_id
            )
            .scalar()
        )

        total_cases = open_cases + resolved_cases

        compliance_score = (
            100
            if total_cases == 0
            else round(
                resolved_cases * 100 / total_cases,
                2,
            )
        )

        risk_score = (
            100 - compliance_score
        )

        return {

            "total_invoices": total_invoices,

            "total_uploads": total_uploads,

            "total_vendors": total_vendors,

            "blocked_itc": blocked_itc,

            "recoverable_itc": recoverable_itc,

            "total_taxable": total_taxable,

            "total_gst": total_gst,

            "risk_score": risk_score,

            "open_cases": open_cases,

            "resolved_cases": resolved_cases,

            "critical_cases": critical_cases,

            "high_cases": high_cases,

            "medium_cases": medium_cases,

            "low_cases": low_cases,

            "recoverable_gst": recoverable_gst,

            "compliance_score": compliance_score,

        }