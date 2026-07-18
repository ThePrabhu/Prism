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

    SUPABASE_URL: str
    
    SUPABASE_ANON_KEY: str
    
    SUPABASE_SERVICE_ROLE_KEY: str

    NEO4J_URI: str

    NEO4J_USERNAME: str

    NEO4J_PASSWORD: str

    class Config:
        env_file = ".env"


settings = Settings()