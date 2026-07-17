from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.current_user import get_current_user

from app.services.itc_engine import ITCEngine
from app.schemas.itc import ITCSummary

router = APIRouter(
    prefix="/itc",
    tags=["ITC"],
)


@router.get(
    "/{workspace_id}",
    response_model=ITCSummary,
)
def get_itc(
    workspace_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    return ITCEngine.calculate(
        db,
        workspace_id,
    )