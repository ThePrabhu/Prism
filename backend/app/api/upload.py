from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import HTTPException
from fastapi import UploadFile

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.current_user import get_current_user

from app.services.storage_service import StorageService
from app.services.upload_service import UploadService
from app.services.parser_service import ParserService
from app.services.normalizer_service import NormalizerService
from app.services.invoice_service import InvoiceService

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post("")
async def upload_file(
    workspace_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    try:

        # ------------------------------------------------
        # STEP 1 - Store file
        # ------------------------------------------------

        stored = await StorageService.save(file)

        # ------------------------------------------------
        # STEP 2 - Create Upload Record
        # ------------------------------------------------

        upload = UploadService.create(
            db=db,
            workspace_id=workspace_id,
            stored=stored,
        )

        UploadService.mark_processing(
            db,
            upload,
        )

        # ------------------------------------------------
        # STEP 3 - Parse File
        # ------------------------------------------------

        rows = ParserService.parse(
            stored["path"],
            stored["extension"],
        )

        # ------------------------------------------------
        # STEP 4 - Normalize
        # ------------------------------------------------

        rows = NormalizerService.normalize(rows)

        # ------------------------------------------------
        # STEP 5 - Save Invoices
        # ------------------------------------------------

        invoice_count = InvoiceService.import_invoices(
            db=db,
            upload_id=upload.id,
            rows=rows,
        )

        # ------------------------------------------------
        # STEP 6 - Update Upload Status
        # ------------------------------------------------

        UploadService.mark_completed(
            db=db,
            upload=upload,
            parser=stored["extension"],
            invoice_count=invoice_count,
        )

        # ------------------------------------------------
        # STEP 7 - Response
        # ------------------------------------------------

        return {

            "success": True,

            "workspace_id": workspace_id,

            "upload_id": upload.id,

            "original_name": stored["original_name"],

            "stored_name": stored["stored_name"],

            "file_type": stored["extension"],

            "invoice_count": invoice_count,

            "status": "completed",

        }

    except Exception as e:

        try:

            UploadService.mark_failed(
                db,
                upload,
                str(e),
            )

        except Exception:
            pass

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )