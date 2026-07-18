from time import time

from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import Form
from fastapi import HTTPException
from fastapi import UploadFile

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.core.storage import StorageService

from app.services.upload_service import UploadService
from app.services.parser_service import ParserService
from app.services.normalizer_service import NormalizerService
from app.services.invoice_service import InvoiceService
from app.services.itc_service import ITCService

from app.services.resolution_service import ResolutionService
from app.services.dashboard_service import DashboardService
from app.services.graph_service import GraphService

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("/")
async def upload_file(
    workspace_id: str = Form(...),
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
):

    upload = None

    pipeline_start = time()

    try:

        # ----------------------------------------
        # Save file
        # ----------------------------------------

        stored = await StorageService.save(files)

        # ----------------------------------------
        # Create upload entry
        # ----------------------------------------

        upload = UploadService.create(
            db=db,
            workspace_id=workspace_id,
            stored=stored,
        )

        UploadService.mark_processing(
            db=db,
            upload=upload,
        )

        # ----------------------------------------
        # Parse file
        # ----------------------------------------

        rows = ParserService.parse(
            stored["path"],
            stored["extension"],
        )

        if not rows:

            raise Exception(
                "No records found in uploaded file."
            )

        # ----------------------------------------
        # Normalize rows
        # ----------------------------------------

        rows = NormalizerService.normalize(rows)

        # ----------------------------------------
        # Import invoices
        # ----------------------------------------

        result = InvoiceService.import_invoices(
            db=db,
            upload_id=upload.id,
            rows=rows,
        )
        # ----------------------------------------
        # Run ITC Analysis
        # ----------------------------------------

        itc_summary = ITCService.run(
            db=db,
            workspace_id=workspace_id,
        )

        resolution_summary = ResolutionService.run(db)

        graph_summary = GraphService.sync_workspace(
            db=db,
            workspace_id=workspace_id,
        )

        # ----------------------------------------
        # Refresh Dashboard Metrics
        # ----------------------------------------

        dashboard_summary = DashboardService.get_summary(
            db=db,
            workspace_id=workspace_id,
        )

        processing_time_ms = int(
                    (time() - pipeline_start) * 1000
            )

        # ----------------------------------------
        # Update upload summary
        # ----------------------------------------

        UploadService.mark_completed(
            db=db,
            upload=upload,
            parser=stored["extension"],
            invoice_count=(
                result["imported"]
                + result["duplicates"]
                + result["failed"]
            ),
            imported_count=result["imported"],
            duplicate_count=result["duplicates"],
            failed_count=result["failed"],
            validation_errors=0,
            processing_time_ms=processing_time_ms,
        )

        # ----------------------------------------
        # Response
        # ----------------------------------------

           # ----------------------------------------
        # Response
        # ----------------------------------------

        return {

            "success": True,

            "message": "Upload completed successfully.",

            "upload_id": str(upload.id),

            "filename": stored["original_name"],

            "parser": stored["extension"],

            "invoice_count": (
                result["imported"]
                + result["duplicates"]
                + result["failed"]
            ),

            "imported": result["imported"],

            "duplicates": result["duplicates"],

            "failed": result["failed"],

            "validation_errors": 0,

            "processing_time_ms": processing_time_ms,

            "itc": itc_summary,

            "resolution": resolution_summary,

            "graph": graph_summary,

            "dashboard": dashboard_summary,

        }
    except Exception as e:

        if upload is not None:

            UploadService.mark_failed(
                db=db,
                upload=upload,
                error=str(e),
            )

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )