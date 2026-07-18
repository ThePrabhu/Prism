import uuid

from sqlalchemy.orm import Session

from app.models.invoice import Invoice


class InvoiceService:

    @staticmethod
    def import_invoices(
        db: Session,
        upload_id: str,
        rows: list,
    ):

        imported = 0
        duplicates = 0
        failed = 0

        for row in rows:

            try:

                invoice_number = (
                    row.get("invoice_number") or ""
                ).strip()

                supplier_gstin = (
                    row.get("supplier_gstin") or ""
                ).strip()

                invoice_date = (
                    row.get("invoice_date") or ""
                ).strip()

                if not invoice_number:

                    failed += 1
                    continue

                existing = (
                    db.query(Invoice)
                    .filter(
                        Invoice.invoice_number == invoice_number,
                        Invoice.supplier_gstin == supplier_gstin,
                        Invoice.invoice_date == invoice_date,
                    )
                    .first()
                )

                if existing:

                    duplicates += 1
                    continue

                invoice = Invoice(

                    id=str(uuid.uuid4()),

                    upload_id=upload_id,

                    invoice_number=invoice_number,

                    invoice_date=invoice_date,

                    supplier_gstin=supplier_gstin,

                    recipient_gstin=(
                        row.get("recipient_gstin") or ""
                    ),

                    taxable_value=float(
                        row.get("taxable_value") or 0
                    ),

                    gst_amount=float(
                        row.get("gst_amount") or 0
                    ),

                    total_amount=float(
                        row.get("total_amount") or 0
                    ),

                    status="IMPORTED",

                )

                db.add(invoice)

                imported += 1

            except Exception:

                failed += 1

        db.commit()

        return {

            "imported": imported,

            "duplicates": duplicates,

            "failed": failed,

        }

    @staticmethod
    def get_all(
        db: Session,
    ):

        return (
            db.query(Invoice)
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        invoice_id: str,
    ):

        return (
            db.query(Invoice)
            .filter(
                Invoice.id == invoice_id
            )
            .first()
        )

    @staticmethod
    def get_by_upload(
        db: Session,
        upload_id: str,
    ):

        return (
            db.query(Invoice)
            .filter(
                Invoice.upload_id == upload_id
            )
            .all()
        )

    @staticmethod
    def delete(
        db: Session,
        invoice_id: str,
    ):

        invoice = (
            db.query(Invoice)
            .filter(
                Invoice.id == invoice_id
            )
            .first()
        )

        if not invoice:

            return False

        db.delete(invoice)

        db.commit()

        return True