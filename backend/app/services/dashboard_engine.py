from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.upload import Upload
from app.models.resolution_case import ResolutionCase


class DashboardEngine:

    @staticmethod
    def build(db: Session, workspace_id: str):

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

        uploads = (
            db.query(Upload)
            .filter(
                Upload.workspace_id == workspace_id
            )
            .count()
        )

        vendors = (
            invoices.with_entities(
                Invoice.seller_name
            )
            .distinct()
            .count()
        )

        cases = (
            db.query(ResolutionCase)
            .filter(
                ResolutionCase.workspace_id == workspace_id
            )
        )

        critical = (
            cases.filter(
                ResolutionCase.severity == "critical"
            ).count()
        )

        high = (
            cases.filter(
                ResolutionCase.severity == "high"
            ).count()
        )

        medium = (
            cases.filter(
                ResolutionCase.severity == "medium"
            ).count()
        )

        low = (
            cases.filter(
                ResolutionCase.severity == "low"
            ).count()
        )

        blocked_itc = total_gst * 0.20
        recoverable_itc = total_gst - blocked_itc

        return {

            "uploads": uploads,

            "invoices": total_invoices,

            "vendors": vendors,

            "taxable": total_taxable,

            "gst": total_gst,

            "blocked_itc": blocked_itc,

            "recoverable_itc": recoverable_itc,

            "critical": critical,

            "high": high,

            "medium": medium,

            "low": low,

            "risk_score": max(
                0,
                100 - (
                    critical * 8
                    + high * 5
                    + medium * 2
                ),
            ),

        }