from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.current_user import (
    get_current_user,
)

from app.schemas.dashboard import (
    DashboardSummary,
)

from app.services.dashboard_service import (
    DashboardService,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/{workspace_id}",
    response_model=DashboardSummary,
)
def get_dashboard(

    workspace_id: str,

    db: Session = Depends(get_db),

    user=Depends(get_current_user),

):

    return DashboardService.get_summary(
        db,
        workspace_id,
    )