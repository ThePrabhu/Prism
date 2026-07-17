class NormalizerService:

    COLUMN_MAPPING = {

        "Invoice No": "invoice_number",

        "Invoice Number": "invoice_number",

        "Invoice_Date": "invoice_date",

        "Seller": "seller_name",

        "Vendor": "seller_name",

        "Buyer": "buyer_name",

        "GSTIN": "gstin",

        "GST Amount": "gst_amount",

        "Taxable Value": "taxable_value",

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