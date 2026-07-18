from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()


from app.core.config import settings

from app.api.test import router as test_router
from app.api.auth import router as auth_router
from app.api.workspaces import (
    router as workspace_router,
)
from app.api.upload import (
    router as upload_router,
)

import app.models.resolution_case

from app.api.resolution import (
    router as resolution_router,
)

from app.api.dashboard import router as dashboard_router

from app.api.itc import router as itc_router

from app.api.graph import router as graph_router

from app.api.copilot import router as copilot_router

import app.models.upload
import app.models.invoice

from app.api.itc import router as itc_router
import app.models.user
import app.models.workspace
from app.api.cases import router as case_router


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():

    return {
        "message": "Prism Backend Running"
    }


@app.get("/health")
async def health():

    return {
        "status": "healthy"
    }

app.include_router(test_router)
app.include_router(auth_router)
app.include_router(workspace_router)
app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(resolution_router)
app.include_router(itc_router)
app.include_router(graph_router)
app.include_router(case_router)
app.include_router(copilot_router)