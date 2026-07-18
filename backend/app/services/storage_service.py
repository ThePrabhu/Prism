from uuid import uuid4
from pathlib import Path

from fastapi import UploadFile

from app.core.storage import supabase, BUCKET_NAME


class StorageService:

    @staticmethod
    async def save(file: UploadFile):

        extension = Path(file.filename).suffix

        filename = f"{uuid4()}{extension}"

        file_bytes = await file.read()

        path = f"uploads/{filename}"

        supabase.storage.from_(BUCKET_NAME).upload(
            path=path,
            file=file_bytes,
            file_options={
                "content-type": file.content_type
            },
        )

        @staticmethod
        def delete(path: str):
                supabase.storage.from_(BUCKET_NAME).remove([path])

        return {
            "original_name": file.filename,
            "stored_name": filename,
            "path": path,
            "extension": extension,
            "size": len(file_bytes),
        }
    
