from time import time

from sqlalchemy.orm import Session

from app.models.upload import Upload


class UploadService:

    @staticmethod
    def create(
        db: Session,
        workspace_id: str,
        stored: dict,
    ):

        start = time()

        upload = Upload(

            workspace_id=workspace_id,

            original_name=stored["original_name"],

            stored_name=stored["stored_name"],

            file_type=stored["extension"],

            storage_path=stored["path"],

            file_size=str(stored["size"]),

            parser_used="pending",

            invoice_count=0,

            processing_time_ms=0,

            error_message="",

            status="uploaded",

        )

        db.add(upload)

        db.commit()

        db.refresh(upload)

        upload.processing_time_ms = int(
            (time() - start) * 1000
        )

        db.commit()

        return upload

    @staticmethod
    def mark_processing(
        db: Session,
        upload: Upload,
    ):

        upload.status = "processing"

        db.commit()

    @staticmethod
    def mark_completed(
        db: Session,
        upload: Upload,
        parser: str,
        invoice_count: int,
    ):

        upload.status = "completed"

        upload.parser_used = parser

        upload.invoice_count = invoice_count

        db.commit()

    @staticmethod
    def mark_failed(
        db: Session,
        upload: Upload,
        error: str,
    ):

        upload.status = "failed"

        upload.error_message = error

        db.commit()