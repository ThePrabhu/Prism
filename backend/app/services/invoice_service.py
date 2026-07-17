from sqlalchemy.orm import Session

from app.models.invoice import Invoice


class InvoiceService:

    @staticmethod
    def import_invoices(
        db: Session,
        upload_id: str,
        rows: list,
    ):

        invoices = []

        for row in rows:

            invoice = Invoice(

                upload_id=upload_id,

                invoice_number=row.get(
                    "invoice_number"
                ),

                invoice_date=row.get(
                    "invoice_date"
                ),

                seller_name=row.get(
                    "seller_name"
                ),

                buyer_name=row.get(
                    "buyer_name"
                ),

                gstin=row.get(
                    "gstin"
                ),

                taxable_value=float(
                    row.get(
                        "taxable_value",
                        0,
                    )
                    or 0
                ),

                gst_amount=float(
                    row.get(
                        "gst_amount",
                        0,
                    )
                    or 0
                ),

                total_amount=float(
                    row.get(
                        "total_amount",
                        0,
                    )
                    or 0
                ),

            )

            invoices.append(invoice)

        db.add_all(invoices)

        db.commit()

        return len(invoices)