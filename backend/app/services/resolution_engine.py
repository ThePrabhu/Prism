from typing import List

from app.models.invoice import Invoice
from app.schemas.resolution import ResolutionFinding


class ResolutionEngine:

    @staticmethod
    def analyze_invoice(
        invoice: Invoice,
    ) -> List[ResolutionFinding]:

        findings: List[ResolutionFinding] = []

        #
        # Missing Invoice Number
        #

        if (
            invoice.invoice_number is None
            or invoice.invoice_number.strip() == ""
        ):

            findings.append(

                ResolutionFinding(

                    invoice_id=invoice.id,

                    issue_type="MISSING_INVOICE_NUMBER",

                    severity="HIGH",

                    description="Invoice number is missing.",

                    recoverable_amount=invoice.gst_amount or 0,

                )

            )

        #
        # Missing Invoice Date
        #

        if invoice.invoice_date is None:

            findings.append(

                ResolutionFinding(

                    invoice_id=invoice.id,

                    issue_type="MISSING_INVOICE_DATE",

                    severity="HIGH",

                    description="Invoice date is missing.",

                    recoverable_amount=invoice.gst_amount or 0,

                )

            )

        #
        # Missing Supplier GSTIN
        #

        if (
            invoice.supplier_gstin is None
            or invoice.supplier_gstin.strip() == ""
        ):

            findings.append(

                ResolutionFinding(

                    invoice_id=invoice.id,

                    issue_type="MISSING_SUPPLIER_GSTIN",

                    severity="CRITICAL",

                    description="Supplier GSTIN is missing.",

                    recoverable_amount=invoice.gst_amount or 0,

                )

            )

        #
        # Missing Recipient GSTIN
        #

        if (
            invoice.recipient_gstin is None
            or invoice.recipient_gstin.strip() == ""
        ):

            findings.append(

                ResolutionFinding(

                    invoice_id=invoice.id,

                    issue_type="MISSING_RECIPIENT_GSTIN",

                    severity="CRITICAL",

                    description="Recipient GSTIN is missing.",

                    recoverable_amount=invoice.gst_amount or 0,

                )

            )

        #
        # Invalid GST Amount
        #

        if (
            invoice.gst_amount is None
            or invoice.gst_amount < 0
        ):

            findings.append(

                ResolutionFinding(

                    invoice_id=invoice.id,

                    issue_type="INVALID_GST_AMOUNT",

                    severity="HIGH",

                    description="GST amount is invalid.",

                    recoverable_amount=0,

                )

            )

        #
        # Invalid Taxable Value
        #

        if (
            invoice.taxable_value is None
            or invoice.taxable_value < 0
        ):

            findings.append(

                ResolutionFinding(

                    invoice_id=invoice.id,

                    issue_type="INVALID_TAXABLE_VALUE",

                    severity="HIGH",

                    description="Taxable value is invalid.",

                    recoverable_amount=0,

                )

            )

        #
        # Invalid Total Amount
        #

        if (
            invoice.total_amount is None
            or invoice.total_amount < 0
        ):

            findings.append(

                ResolutionFinding(

                    invoice_id=invoice.id,

                    issue_type="INVALID_TOTAL_AMOUNT",

                    severity="HIGH",

                    description="Total invoice amount is invalid.",

                    recoverable_amount=0,

                )

            )

        #
        # GST exceeds taxable value
        #

        if (
            invoice.gst_amount is not None
            and invoice.taxable_value is not None
            and invoice.gst_amount > invoice.taxable_value
        ):

            findings.append(

                ResolutionFinding(

                    invoice_id=invoice.id,

                    issue_type="GST_VALUE_MISMATCH",

                    severity="MEDIUM",

                    description="GST amount is greater than taxable value.",

                    recoverable_amount=invoice.gst_amount,

                )

            )

        return findings

    @staticmethod
    def analyze_invoices(
        invoices: List[Invoice],
    ) -> List[ResolutionFinding]:

        findings: List[ResolutionFinding] = []

        seen = set()

        for invoice in invoices:

            invoice_findings = ResolutionEngine.analyze_invoice(
                invoice
            )

            findings.extend(invoice_findings)

            key = (

                invoice.invoice_number,

                invoice.supplier_gstin,

            )

            if key in seen:

                findings.append(

                    ResolutionFinding(

                        invoice_id=invoice.id,

                        issue_type="DUPLICATE_INVOICE",

                        severity="HIGH",

                        description="Duplicate invoice detected.",

                        recoverable_amount=invoice.gst_amount or 0,

                    )

                )

            else:

                seen.add(key)

        return findings