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

    from fastapi.middleware.cors import CORSMiddleware
    
    # Configure CORS
    origins = [
        "http://localhost:3000",
        "https://supervea-daily-business-review.vercel.app",  # Production frontend
    ]

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], # For simplicity in this demo, allow all. In prod, use 'origins'
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application

app = create_application()

@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok", "project": settings.PROJECT_NAME}

@app.get("/")
async def root():
    return {
        "message": "Supervea Daily Business Review API is running 🚀",
        "docs": f"{settings.API_V1_STR}/docs"
    }
