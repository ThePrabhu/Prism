from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.current_user import (
    get_current_user,
)

from app.schemas.resolution import (
    ResolutionResponse,
)

from app.services.resolution_service import (
    ResolutionService,
)

router = APIRouter(
    prefix="/resolution",
    tags=["Resolution"],
)


@router.post("/{workspace_id}/generate")
def generate_cases(
    workspace_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    cases = ResolutionService.generate_cases(
        db,
        workspace_id,
    )

    return {

        "generated": len(cases)

    }


@router.get(
    "/{workspace_id}",
    response_model=list[ResolutionResponse],
)
def get_cases(
    workspace_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    return ResolutionService.list_cases(
        db,
        workspace_id,
    )