from pydantic import BaseModel


class CopilotRequest(BaseModel):
    workspace_id: str
    message: str


class CopilotResponse(BaseModel):
    response: str