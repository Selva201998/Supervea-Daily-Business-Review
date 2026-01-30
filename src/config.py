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
        if os.environ.get("VERCEL") == "1":
            # 1. Prefer Vercel Postgres (POSTGRES_URL) if available
            postgres_url = os.environ.get("POSTGRES_URL")
            if postgres_url:
                # Driver adjustment: postgres:// -> postgresql+asyncpg:// 
                if postgres_url.startswith("postgres://"):
                     postgres_url = postgres_url.replace("postgres://", "postgresql+asyncpg://", 1)
                elif postgres_url.startswith("postgresql://"):
                     postgres_url = postgres_url.replace("postgresql://", "postgresql+asyncpg://", 1)
                self.DATABASE_URL = postgres_url
            
            # 2. Fallback to sqlite in /tmp if still using default file path
            elif "sqlite" in self.DATABASE_URL:
                self.DATABASE_URL = "sqlite+aiosqlite:////tmp/supervea.db"

settings = Settings()
