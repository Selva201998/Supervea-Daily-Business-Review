from datetime import date, time
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, conint, Field

# 4.1 Enums
class ImpactLevel(str, Enum):
    low = "Low"
    medium = "Medium"
    high = "High"
    medium_high = "Medium–High"

class KPIStatus(str, Enum):
    on_track = "On Track"
    at_risk = "At Risk"
    needs_attention = "Needs Attention"

# 4.2 Core Models
class Metadata(BaseModel):
    date: date
    prepared_for: str
    delivery_time: time

class ExecutiveSnapshot(BaseModel):
    summary: str

class RiskMitigation(BaseModel):
    risk: str
    mitigation: str

class Workstream(BaseModel):
    title: str
    operational_area: str
    project_lead: str
    executive_sponsor: str
    progress_percent: conint(ge=0, le=100)
    budget_impact: str
    budget_weighting: ImpactLevel
    impact_eoy_performance: ImpactLevel
    why_this_matters_today: str
    risks_and_mitigations: List[RiskMitigation]
    next_executive_action: str

class ActionItem(BaseModel):
    action: str
    delegation_target: Optional[str] = None
    requires_executive_input: bool = False

class Meeting(BaseModel):
    time: time
    title: str
    objective: str
    required_outcome: str

class FollowUp(BaseModel):
    description: str

class KPI(BaseModel):
    name: str
    status: KPIStatus
    note: Optional[str] = None

class Recommendations(BaseModel):
    recommendations: List[str]

class MomentumClose(BaseModel):
    statement: str

class WhyThisWorks(BaseModel):
    points: List[str]

# 4.3 Aggregate Root
class DailyExecutiveBriefing(BaseModel):
    metadata: Metadata
    executive_snapshot: ExecutiveSnapshot
    high_impact_workstreams: List[Workstream]
    key_action_items: List[ActionItem]
    meetings_and_events: List[Meeting]
    follow_ups_and_watchpoints: List[FollowUp]
    kpi_goal_pulse: List[KPI]
    supervea_recommendations: Recommendations
    momentum_close: MomentumClose
    why_this_works: WhyThisWorks
