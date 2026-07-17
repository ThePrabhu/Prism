import pandas as pd

import pdfplumber


class ParserService:

    @staticmethod
    def parse(path: str, extension: str):

        extension = extension.lower()

        if extension == "csv":

            return ParserService.parse_csv(path)

        if extension in [
            "xlsx",
            "xls",
        ]:

            return ParserService.parse_excel(path)

        if extension == "pdf":

            return ParserService.parse_pdf(path)

        if extension in [

            "png",

            "jpg",

            "jpeg",

        ]:

            return ParserService.parse_image(path)

        raise Exception(
            "Unsupported file."
        )

    @staticmethod
    def parse_csv(path):

        return (
            pd.read_csv(path)
            .to_dict(
                orient="records"
            )
        )

    @staticmethod
    def parse_excel(path):

        return (
            pd.read_excel(path)
            .to_dict(
                orient="records"
            )
        )

    @staticmethod
    def parse_pdf(path):

        rows = []

        with pdfplumber.open(path) as pdf:

            for page in pdf.pages:

                table = page.extract_table()

                if table:

                    header = table[0]

                    for row in table[1:]:

                        rows.append(

                            dict(
                                zip(
                                    header,
                                    row,
                                )
                            )

                        )

        return rows

    @staticmethod
    def parse_image(path):

        """
        OCR comes in Batch 2.

        Returning empty list temporarily.
        """

        return []