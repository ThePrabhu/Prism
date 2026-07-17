from supabase import create_client

from app.core.config import settings

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY,
)


async def verify_token(token: str):

    try:

        response = supabase.auth.get_user(token)

        return response.user

    except Exception:

        return None