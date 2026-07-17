from fastapi import APIRouter
from fastapi import Depends

from app.dependencies.current_user import (
    get_current_user,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.get("/me")
async def me(
    user=Depends(get_current_user),
):

    return {

        "id": user.id,

        "email": user.email,

        "metadata": user.user_metadata,

    }