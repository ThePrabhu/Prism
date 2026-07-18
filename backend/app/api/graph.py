from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.services.graph_service import GraphService


router = APIRouter(
    prefix="/graph",
    tags=["Knowledge Graph"],
)


# -----------------------------------------------------
# Sync Workspace
# -----------------------------------------------------

@router.post("/sync")
def sync_workspace(
    workspace_id: str,
    db: Session = Depends(get_db),
):

    try:

        result = GraphService.sync_workspace(
            db=db,
            workspace_id=workspace_id,
        )

        return {

            "success": True,

            "message": "Workspace synchronized successfully.",

            "data": result,

        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# -----------------------------------------------------
# Graph Statistics
# -----------------------------------------------------

@router.get("/statistics")
def graph_statistics():

    try:

        return {

            "success": True,

            "statistics": GraphService.statistics(),

        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


# -----------------------------------------------------
# Clear Workspace Graph
# -----------------------------------------------------

@router.delete("/workspace")
def clear_workspace(
    workspace_id: str,
):

    try:

        GraphService.clear_workspace(
            workspace_id,
        )

        return {

            "success": True,

            "message": "Workspace graph deleted.",

        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
    
@router.get("/network")
def network(
    workspace_id: str,
):

    return {

        "success": True,

        "graph": GraphService.get_network(
            workspace_id
        )

    }