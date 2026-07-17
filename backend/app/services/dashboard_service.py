from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.upload import Upload


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

        risk_score = 15

        return {

            "total_invoices": total_invoices,

            "total_uploads": total_uploads,

            "total_vendors": total_vendors,

            "blocked_itc": blocked_itc,

            "recoverable_itc": recoverable_itc,

            "total_taxable": total_taxable,

            "total_gst": total_gst,

            "risk_score": risk_score,

        }