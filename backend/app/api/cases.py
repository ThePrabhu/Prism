from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.resolution_case import ResolutionCase

from app.schemas.case import CaseResponse
from app.schemas.case import CaseUpdate

from app.services.case_service import CaseService

router = APIRouter(
    prefix="/cases",
    tags=["Compliance Cases"],
)


@router.post("/generate")
def generate_cases(
    workspace_id: str,
    db: Session = Depends(get_db),
):
    return CaseService.generate(
        db=db,
        workspace_id=workspace_id,
    )


@router.get(
    "/",
    response_model=list[CaseResponse],
)
def get_cases(
    db: Session = Depends(get_db),
):
    return (
        db.query(ResolutionCase)
        .order_by(ResolutionCase.created_at.desc())
        .all()
    )


@router.get(
    "/{case_id}",
    response_model=CaseResponse,
)
def get_case(
    case_id: str,
    db: Session = Depends(get_db),
):
    case = (
        db.query(ResolutionCase)
        .filter(
            ResolutionCase.id == case_id
        )
        .first()
    )

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found",
        )

    return case


@router.patch(
    "/{case_id}",
    response_model=CaseResponse,
)
def update_case(
    case_id: str,
    payload: CaseUpdate,
    db: Session = Depends(get_db),
):
    case = (
        db.query(ResolutionCase)
        .filter(
            ResolutionCase.id == case_id
        )
        .first()
    )

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found",
        )

    case.status = payload.status

    db.commit()

    db.refresh(case)

    return case


@router.delete("/{case_id}")
def delete_case(
    case_id: str,
    db: Session = Depends(get_db),
):
    case = (
        db.query(ResolutionCase)
        .filter(
            ResolutionCase.id == case_id
        )
        .first()
    )

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found",
        )

    db.delete(case)

    db.commit()

    return {
        "message": "Case deleted"
    }