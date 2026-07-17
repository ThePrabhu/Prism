from fastapi import APIRouter
from sqlalchemy import text

from app.core.database import SessionLocal

router = APIRouter()


@router.get("/db-test")
def db_test():

    db = SessionLocal()

    result = db.execute(
        text("SELECT NOW();")
    )

    return {
        "database": str(result.scalar())
    }