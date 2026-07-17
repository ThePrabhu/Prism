from sqlalchemy.orm import Session

from app.models.workspace import Workspace
from app.schemas.workspace import WorkspaceCreate


class WorkspaceService:

    @staticmethod
    def create_workspace(
        db: Session,
        owner_id: str,
        data: WorkspaceCreate,
    ):

        workspace = Workspace(
            id=data.id if hasattr(data, "id") else None,
            name=data.name,
            owner_id=owner_id,
        )

        db.add(workspace)
        db.commit()
        db.refresh(workspace)

        return workspace

    @staticmethod
    def get_workspaces(
        db: Session,
        owner_id: str,
    ):

        return (
            db.query(Workspace)
            .filter(Workspace.owner_id == owner_id)
            .order_by(Workspace.created_at.desc())
            .all()
        )

    @staticmethod
    def delete_workspace(
        db: Session,
        workspace_id: str,
        owner_id: str,
    ):

        workspace = (
            db.query(Workspace)
            .filter(
                Workspace.id == workspace_id,
                Workspace.owner_id == owner_id,
            )
            .first()
        )

        if workspace is None:
            return None

        db.delete(workspace)
        db.commit()

        return workspace