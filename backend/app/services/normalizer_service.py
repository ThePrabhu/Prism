class NormalizerService:

    COLUMN_MAPPING = {

        "Invoice No": "invoice_number",
        "Invoice Number": "invoice_number",

        "Invoice Date": "invoice_date",
        "Invoice_Date": "invoice_date",

        "Seller": "seller_name",
        "Vendor": "seller_name",

        "Buyer": "buyer_name",

        "Vendor GSTIN": "supplier_gstin",
        "Seller GSTIN": "supplier_gstin",

        "Buyer GSTIN": "recipient_gstin",

        "GST Amount": "gst_amount",

        "Taxable Value": "taxable_value",

        "Invoice Value": "total_amount",

        "Total": "total_amount",
    }
    @classmethod
    def normalize(cls, rows):

        normalized = []

        for row in rows:

            item = {}

            for key, value in row.items():

                field = cls.COLUMN_MAPPING.get(key)

                if field:

                    item[field] = value

            normalized.append(item)

        return normalized