from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.dependencies.current_user import (
    get_current_user,
)

from app.schemas.workspace import (
    WorkspaceCreate,
    WorkspaceResponse,
)

from app.services.workspace_service import (
    WorkspaceService,
)

router = APIRouter(
    prefix="/workspace",
    tags=["Workspace"],
)


@router.post(
    "",
    response_model=WorkspaceResponse,
)
def create_workspace(
    data: WorkspaceCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    return WorkspaceService.create_workspace(
        db,
        user.id,
        data,
    )


@router.get(
    "",
    response_model=list[WorkspaceResponse],
)
def get_workspaces(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    return WorkspaceService.get_workspaces(
        db,
        user.id,
    )


@router.delete("/{workspace_id}")
def delete_workspace(
    workspace_id: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):

    workspace = WorkspaceService.delete_workspace(
        db,
        workspace_id,
        user.id,
    )

    if workspace is None:

        raise HTTPException(
            status_code=404,
            detail="Workspace not found",
        )

    return {
        "message": "Workspace deleted"
    }