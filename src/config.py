from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Supervea Daily Executive Briefing"
    PROJECT_VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./supervea.db"
    
    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Check if running on Vercel without a custom DATABASE_URL
        # Vercel functions are read-only except for /tmp
        import os
        if os.environ.get("VERCEL") == "1" and "sqlite" in self.DATABASE_URL:
            # Fallback to tmp directory so the app can start (even if data is ephemeral)
            self.DATABASE_URL = "sqlite+aiosqlite:////tmp/supervea.db"

settings = Settings()
