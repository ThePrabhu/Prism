from sqlalchemy.orm import Session

from app.core.neo4j import get_session

from app.models.invoice import Invoice
from app.models.upload import Upload
from app.models.itc_record import ITCRecord


class GraphService:

    # -----------------------------------------------------
    # Sync Entire Workspace
    # -----------------------------------------------------

    @staticmethod
    def sync_workspace(
        db: Session,
        workspace_id: str,
    ):

        invoices = (
            db.query(Invoice)
            .join(
                Upload,
                Invoice.upload_id == Upload.id,
            )
            .filter(
                Upload.workspace_id == workspace_id
            )
            .all()
        )

        session = get_session()

        try:

            session.run(
                """
                MERGE (w:Workspace {id:$workspace})
                """,
                workspace=workspace_id,
            )

            for invoice in invoices:

                GraphService.sync_invoice(
                    session,
                    workspace_id,
                    invoice,
                )

            return {

                "success": True,

                "workspace": workspace_id,

                "invoices": len(invoices),

            }

        finally:

            session.close()

    # -----------------------------------------------------
    # Sync One Invoice
    # -----------------------------------------------------

    @staticmethod
    def sync_invoice(
        session,
        workspace_id,
        invoice,
    ):

        session.run(
            """
            MERGE (w:Workspace {id:$workspace})

            MERGE (i:Invoice {
                id:$id
            })

            SET

                i.invoice_number=$invoice_number,

                i.invoice_date=$invoice_date,

                i.taxable_value=$taxable_value,

                i.gst_amount=$gst_amount,

                i.total_amount=$total_amount

            MERGE (w)-[:HAS_INVOICE]->(i)
            """,

            workspace=workspace_id,

            id=invoice.id,

            invoice_number=invoice.invoice_number,

            invoice_date=invoice.invoice_date,

            taxable_value=invoice.taxable_value,

            gst_amount=invoice.gst_amount,

            total_amount=invoice.total_amount,

        )

        GraphService.sync_supplier(
            session,
            invoice,
        )

        GraphService.sync_recipient(
            session,
            invoice,
        )

        GraphService.sync_itc(
            session,
            invoice.id,
        )

    # -----------------------------------------------------
    # Supplier
    # -----------------------------------------------------

    @staticmethod
    def sync_supplier(
        session,
        invoice,
    ):

        if not invoice.supplier_gstin:

            return

        session.run(
            """
            MERGE (v:Vendor {

                gstin:$gstin

            })

            MERGE (i:Invoice {

                id:$invoice

            })

            MERGE (v)-[:SUPPLIED]->(i)
            """,

            gstin=invoice.supplier_gstin,

            invoice=invoice.id,

        )

    # -----------------------------------------------------
    # Recipient
    # -----------------------------------------------------

    @staticmethod
    def sync_recipient(
        session,
        invoice,
    ):

        if not invoice.recipient_gstin:

            return

        session.run(
            """
            MERGE (b:Buyer {

                gstin:$gstin

            })

            MERGE (i:Invoice {

                id:$invoice

            })

            MERGE (b)-[:RECEIVED]->(i)
            """,

            gstin=invoice.recipient_gstin,

            invoice=invoice.id,

        )

    # -----------------------------------------------------
    # ITC
    # -----------------------------------------------------

    @staticmethod
    def sync_itc(
        session,
        invoice_id,
    ):

        from app.core.database import SessionLocal

        db = SessionLocal()

        try:

            itc = (
                db.query(ITCRecord)
                .filter(
                    ITCRecord.invoice_id == invoice_id
                )
                .first()
            )

            if not itc:
                return

            session.run(
                """
                MERGE (i:Invoice {id:$invoice})

                MERGE (t:ITC {
                    invoice:$invoice
                })

                SET

                    t.status=$status,

                    t.reason=$reason,

                    t.gst_amount=$gst,

                    t.eligible_amount=$eligible,

                    t.blocked_amount=$blocked,

                    t.recoverable_amount=$recoverable

                MERGE (i)-[:HAS_ITC]->(t)
                """,

                invoice=invoice_id,

                status=itc.eligibility,

                reason=itc.reason,

                gst=float(itc.gst_amount or 0),

                eligible=float(itc.eligible_amount or 0),

                blocked=float(itc.blocked_amount or 0),

                recoverable=float(itc.recoverable_amount or 0),

            )

        finally:

            db.close()

    # -----------------------------------------------------
    # Delete Workspace
    # -----------------------------------------------------

    @staticmethod
    def clear_workspace(
        workspace_id,
    ):

        session = get_session()

        try:

            session.run(
                """
                MATCH (w:Workspace {id:$id})

                DETACH DELETE w
                """,

                id=workspace_id,

            )

        finally:

            session.close()

    # -----------------------------------------------------
    # Statistics
    # -----------------------------------------------------

    @staticmethod
    def statistics():

        session = get_session()

        try:

            nodes = session.run(
                """
                MATCH (n)

                RETURN count(n) AS total
                """
            ).single()["total"]

            edges = session.run(
                """
                MATCH ()-[r]->()

                RETURN count(r) AS total
                """
            ).single()["total"]

            return {

                "nodes": nodes,

                "relationships": edges,

            }

        finally:

            session.close()