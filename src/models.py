from sqlalchemy import Column, String, Date, Time, Text, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.mutable import MutableDict
# For SQLite compatibility if needed, we might need a custom TypeDecorator for JSON
# But sticking to the spec -> JSONB (assuming Postgres for production, but TypeDecorator for local SQLite fallback if we go that route)
from sqlalchemy.types import JSON
from datetime import date, time, datetime
import uuid

class Base(DeclarativeBase):
    pass

class DailyExecutiveBriefingModel(Base):
    __tablename__ = "daily_executive_briefings"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    briefing_date: Mapped[date] = mapped_column(Date, nullable=False)
    prepared_for: Mapped[str] = mapped_column(String, nullable=False)
    delivery_time: Mapped[time] = mapped_column(Time, nullable=False)
    schema_version: Mapped[str] = mapped_column(String, nullable=False, default="v1.0")
    
    # Using generic JSON type which works with SQLite (as TEXT) and Postgres (as JSON/JSONB)
    briefing_payload: Mapped[dict] = mapped_column(JSON, nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now(), nullable=False)

    __table_args__ = (
        UniqueConstraint('briefing_date', 'prepared_for', name='uq_briefing_date_user'),
    )
