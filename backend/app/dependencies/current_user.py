from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials

from app.core.auth import verify_token

bearer = HTTPBearer()


async def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(
        bearer
    ),

):

    token = credentials.credentials

    user = await verify_token(token)

    if user is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token",
        )

    return user