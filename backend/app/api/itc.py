from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.services.itc_service import ITCService


router = APIRouter(
    prefix="/itc",
    tags=["ITC"],
)


# ---------------------------------------------------------
# Run ITC Analysis
# ---------------------------------------------------------

@router.post("/run")
def run_itc_analysis(
    workspace_id: str,
    db: Session = Depends(get_db),
):

    try:

        result = ITCService.run(
            db=db,
            workspace_id=workspace_id,
        )

        return {

            "success": True,

            "message": "ITC analysis completed successfully.",

            "summary": result,

        }

    except Exception as e:

        raise HTTPException(

            status_code=400,

            detail=str(e),

        )


# ---------------------------------------------------------
# Get All ITC Records
# ---------------------------------------------------------

@router.get("/")
def get_itc_records(
    workspace_id: str,
    db: Session = Depends(get_db),
):

    try:

        records = ITCService.get_all(

            db=db,

            workspace_id=workspace_id,

        )

        return {

            "success": True,

            "count": len(records),

            "records": records,

        }

    except Exception as e:

        raise HTTPException(

            status_code=400,

            detail=str(e),

        )


# ---------------------------------------------------------
# ITC Summary
# ---------------------------------------------------------

@router.get("/summary")
def get_itc_summary(
    workspace_id: str,
    db: Session = Depends(get_db),
):

    try:

        summary = ITCService.get_summary(

            db=db,

            workspace_id=workspace_id,

        )

        return {

            "success": True,

            "summary": summary,

        }

    except Exception as e:

        raise HTTPException(

            status_code=400,

            detail=str(e),

        )