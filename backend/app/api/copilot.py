from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.copilot import (
    CopilotRequest,
    CopilotResponse,
)

from app.services.copilot_service import CopilotService


router = APIRouter(
    prefix="/copilot",
    tags=["AI Copilot"],
)


@router.post(
    "/chat",
    response_model=CopilotResponse,
    summary="Ask Prism AI",
    description="AI GST Compliance Assistant",
)
def chat(
    payload: CopilotRequest,
    db: Session = Depends(get_db),
):

    answer = CopilotService.chat(
        db=db,
        workspace_id=payload.workspace_id,
        message=payload.message,
    )

    return CopilotResponse(
        response=answer
    )