from sqlalchemy.orm import Session

from app.models.invoice import Invoice


class DuplicateService:

    @staticmethod
    def find_duplicate(
        db: Session,
        supplier_gstin: str,
        invoice_number: str,
        invoice_date,
    ):

        return (
            db.query(Invoice)
            .filter(
                Invoice.gstin == supplier_gstin,
                Invoice.invoice_number == invoice_number,
                Invoice.invoice_date == invoice_date,
            )
            .first()
        )