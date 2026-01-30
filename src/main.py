from fastapi import FastAPI
from src.config import settings
from src.api.v1.endpoints import briefings
from contextlib import asynccontextmanager
from src.database import engine
from src.models import Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Cleanup on shutdown (if needed)

def create_application() -> FastAPI:
    application = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.PROJECT_VERSION,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        docs_url=f"{settings.API_V1_STR}/docs",
        lifespan=lifespan,
    )

    # Include routers
    application.include_router(
        briefings.router, 
        prefix=f"{settings.API_V1_STR}/briefings", 
        tags=["briefings"]
    )

    return application

app = create_application()

@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "project": settings.PROJECT_NAME}
