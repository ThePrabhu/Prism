from sqlalchemy import func

from app.models.invoice import Invoice
from app.models.upload import Upload
from app.models.resolution_case import ResolutionCase
from app.models.resolution_case import ResolutionCase


class DashboardService:


    @staticmethod
    def get_summary(db):

        total_uploads = db.query(
            Upload
        ).count()

        total_invoices = db.query(
            Invoice
        ).count()

        open_cases = (

            db.query(
                ResolutionCase
            )

            .filter(
                ResolutionCase.status == "open"
            )

            .count()

        )

        resolved_cases = (

            db.query(
                ResolutionCase
            )

            .filter(
                ResolutionCase.status == "resolved"
            )

            .count()

        )

        critical_cases = (

            db.query(
                ResolutionCase
            )

            .filter(
                ResolutionCase.severity == "CRITICAL"
            )

            .count()

        )

        high_cases = (

            db.query(
                ResolutionCase
            )

            .filter(
                ResolutionCase.severity == "HIGH"
            )

            .count()

        )

        medium_cases = (

            db.query(
                ResolutionCase
            )

            .filter(
                ResolutionCase.severity == "MEDIUM"
            )

            .count()

        )

        low_cases = (

            db.query(
                ResolutionCase
            )

            .filter(
                ResolutionCase.severity == "LOW"
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

            .scalar()

        )

        total_cases = (
            open_cases + resolved_cases
        )

        if total_cases == 0:

            compliance_score = 100.0

        else:

            compliance_score = round(

                (
                    resolved_cases
                    / total_cases
                )
                * 100,

                2,

            )

        return {

            "total_uploads": total_uploads,

            "total_invoices": total_invoices,

            "open_cases": open_cases,

            "resolved_cases": resolved_cases,

            "critical_cases": critical_cases,

            "high_cases": high_cases,

            "medium_cases": medium_cases,

            "low_cases": low_cases,

            "recoverable_gst": recoverable_gst,

            "compliance_score": compliance_score,

        }