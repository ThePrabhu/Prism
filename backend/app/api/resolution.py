from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.resolution import (
    ResolutionCaseResponse,
)

from app.services.resolution_service import (
    ResolutionService,
)

router = APIRouter(
    prefix="/resolution",
    tags=["Resolution"],
)


@router.post("/run")
def run_resolution_engine(
    db: Session = Depends(get_db),
):

    return ResolutionService.run(db)


@router.get(
    "/",
    response_model=list[ResolutionCaseResponse],
)
def get_resolution_cases(
    db: Session = Depends(get_db),
):

    return ResolutionService.get_all(db)


@router.get(
    "/{case_id}",
    response_model=ResolutionCaseResponse,
)
def get_resolution_case(
    case_id: str,
    db: Session = Depends(get_db),
):

    case = ResolutionService.get_by_id(
        db,
        case_id,
    )

    if case is None:

        raise HTTPException(
            status_code=404,
            detail="Resolution case not found.",
        )

    return case


@router.patch(
    "/{case_id}",
    response_model=ResolutionCaseResponse,
)
def update_resolution_case(
    case_id: str,
    status: str,
    db: Session = Depends(get_db),
):

    case = ResolutionService.update_status(
        db,
        case_id,
        status,
    )

    if case is None:

        raise HTTPException(
            status_code=404,
            detail="Resolution case not found.",
        )

    return case


@router.delete("/{case_id}")
def delete_resolution_case(
    case_id: str,
    db: Session = Depends(get_db),
):

    deleted = ResolutionService.delete(
        db,
        case_id,
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Resolution case not found.",
        )

    return {
        "message": "Resolution case deleted successfully."
    }