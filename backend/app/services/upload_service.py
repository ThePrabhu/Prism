from time import time

from sqlalchemy.orm import Session

from app.models.upload import Upload

from app.services.resolution_service import ResolutionService
from app.services.dashboard_service import DashboardService

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

            storage_path=stored["path"],

            file_type=stored["extension"],

            file_size=stored["size"],

            parser_used="pending",

            status="uploaded",

            error_message="",

            invoice_count=0,

            imported_count=0,

            duplicate_count=0,

            failed_count=0,

            validation_errors=0,

            processing_time_ms=0,
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

        db.refresh(upload)

    @staticmethod
    def mark_completed(
        db: Session,
        upload: Upload,
        parser: str,
        invoice_count: int,
        imported_count: int,
        duplicate_count: int,
        failed_count: int,
        validation_errors: int = 0,
        processing_time_ms: int = 0,
    ):

        upload.status = "completed"

        upload.parser_used = parser

        upload.invoice_count = invoice_count

        upload.imported_count = imported_count

        upload.duplicate_count = duplicate_count

        upload.failed_count = failed_count

        upload.validation_errors = validation_errors

        upload.processing_time_ms = processing_time_ms

        db.commit()

        db.refresh(upload)

        return upload

    @staticmethod
    def mark_failed(
        db: Session,
        upload: Upload,
        error: str,
    ):

        upload.status = "failed"

        upload.error_message = error

        db.commit()

        db.refresh(upload)

        return upload