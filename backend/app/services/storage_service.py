import os
import shutil
import uuid

from fastapi import UploadFile

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True,
)


class StorageService:

    @staticmethod
    async def save(file: UploadFile):

        extension = file.filename.split(".")[-1].lower()

        filename = (
            f"{uuid.uuid4()}.{extension}"
        )

        path = os.path.join(
            UPLOAD_FOLDER,
            filename,
        )

        with open(path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer,
            )

        return {

            "path": path,

            "stored_name": filename,

            "extension": extension,

            "size": os.path.getsize(path),

        }