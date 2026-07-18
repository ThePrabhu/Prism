import os
from uuid import uuid4

from fastapi import UploadFile
from supabase import create_client

from app.core.config import settings


supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY,
)

BUCKET_NAME = "gst-files"


class StorageService:

    @staticmethod
    async def save(file: UploadFile):

        extension = os.path.splitext(file.filename)[1].lower()

        stored_name = f"{uuid4()}{extension}"

        file_bytes = await file.read()

        path = stored_name

        supabase.storage.from_(BUCKET_NAME).upload(
            path=path,
            file=file_bytes,
            file_options={
                "content-type": file.content_type,
                "upsert": "false",
            },
        )

        return {
            "original_name": file.filename,
            "stored_name": stored_name,
            "extension": extension,
            "size": len(file_bytes),
            "path": path,
        }