from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from sqlalchemy.exc import IntegrityError
from typing import List

from src.database import get_db
from src.schemas import DailyExecutiveBriefing
from src.models import DailyExecutiveBriefingModel

router = APIRouter()

@router.post("/", response_model=DailyExecutiveBriefing, status_code=status.HTTP_201_CREATED)
async def create_briefing(
    briefing: DailyExecutiveBriefing,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new daily executive briefing.
    Enforces uniqueness for (date, prepared_for).
    """
    # Convert Pydantic model to dict, then to SQLAlchemy model
    # We store the entire Pydantic model as a dict in the JSON column
    
    db_briefing = DailyExecutiveBriefingModel(
        briefing_date=briefing.metadata.date,
        prepared_for=briefing.metadata.prepared_for,
        delivery_time=briefing.metadata.delivery_time,
        briefing_payload=briefing.model_dump(mode='json') # Store everything as JSON
    )
    
    try:
        db.add(db_briefing)
        await db.commit()
        await db.refresh(db_briefing)
        return briefing
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, 
            detail="Briefing already exists for this date and user."
        )
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/latest", response_model=DailyExecutiveBriefing)
async def get_latest_briefing(db: AsyncSession = Depends(get_db)):
    """
    Retrieve the most recent briefing.
    """
    stmt = select(DailyExecutiveBriefingModel).order_by(desc(DailyExecutiveBriefingModel.briefing_date)).limit(1)
    result = await db.execute(stmt)
    briefing_model = result.scalar_one_or_none()
    
    if not briefing_model:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No briefings found")
    
    # Reconstruct Pydantic model from stored JSON
    return DailyExecutiveBriefing(**briefing_model.briefing_payload)

@router.get("/{date_str}", response_model=DailyExecutiveBriefing)
async def get_briefing_by_date(
    date_str: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieve a briefing by date (YYYY-MM-DD).
    """
    from datetime import datetime
    try:
        query_date = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid date format. Use YYYY-MM-DD")

    stmt = select(DailyExecutiveBriefingModel).where(DailyExecutiveBriefingModel.briefing_date == query_date)
    result = await db.execute(stmt)
    briefing_model = result.scalar_one_or_none()
    
    if not briefing_model:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No briefing found for {date_str}")
        
    return DailyExecutiveBriefing(**briefing_model.briefing_payload)
