import requests
import json
from datetime import date

# Construct a valid payload based on the schema
payload = {
    "metadata": {
        "date": "2025-05-14",
        "prepared_for": "Alex Morgan",
        "delivery_time": "08:00"
    },
    "executive_snapshot": {
        "summary": "Today is an execution- and decision-focused day."
    },
    "high_impact_workstreams": [
        {
            "title": "Q3 Budget Planning",
            "operational_area": "Finance",
            "project_lead": "Sarah Chen",
            "executive_sponsor": "CFO",
            "progress_percent": 78,
            "budget_impact": "±2% variance risk",
            "budget_weighting": "High",
            "impact_eoy_performance": "High",
            "why_this_matters_today": "Approval required.",
            "risks_and_mitigations": [
                {
                    "risk": "Assumption misalignment",
                    "mitigation": "Confirm inputs today"
                }
            ],
            "next_executive_action": "Approve assumptions."
        }
    ],
    "key_action_items": [
        {
            "action": "Finance approval response",
            "delegation_target": "Supervea",
            "requires_executive_input": False
        }
    ],
    "meetings_and_events": [
        {
            "time": "10:30",
            "title": "Weekly Ops Check-In",
            "objective": "Confirm blockers",
            "required_outcome": "Priority sequencing"
        }
    ],
    "follow_ups_and_watchpoints": [
        {
            "description": "Awaiting final confirmation from Finance"
        }
    ],
    "kpi_goal_pulse": [
        {
            "name": "Q3 Planning Readiness",
            "status": "On Track"
        }
    ],
    "supervea_recommendations": {
        "recommendations": ["Block first 60 mins"]
    },
    "momentum_close": {
        "statement": "Completing today's priority decisions will lock budget assumptions."
    },
    "why_this_works": {
        "points": ["One-page, outcome-driven structure"]
    }
}

base_url = "http://127.0.0.1:8000/api/v1/briefings"

print(f"Testing POST {base_url}...")
try:
    response = requests.post(base_url, json=payload)
    if response.status_code == 201:
        print("SUCCESS: Created briefing.")
        print(json.dumps(response.json(), indent=2))
    elif response.status_code == 409:
        print("WARNING: Conflict (already exists).")
    else:
        print(f"FAILED: {response.status_code} - {response.text}")
except Exception as e:
    print(f"ERROR: {e}")

print(f"\nTesting GET {base_url}/latest...")
try:
    response = requests.get(f"{base_url}/latest")
    if response.status_code == 200:
        print("SUCCESS: Retrieved latest briefing.")
    else:
        print(f"FAILED: {response.status_code} - {response.text}")
except Exception as e:
    print(f"ERROR: {e}")
