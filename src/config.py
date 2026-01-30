from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Supervea Daily Executive Briefing"
    PROJECT_VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./supervea.db"
    
    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
