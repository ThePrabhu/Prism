from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str

    HOST: str

    PORT: int

    SUPABASE_URL: str

    SUPABASE_KEY: str
    
    DATABASE_URL: str

    JWT_SECRET: str

    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()