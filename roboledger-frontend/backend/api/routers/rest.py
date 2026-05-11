from fastapi import APIRouter
import json
import os

router = APIRouter()

# Path to the mock telemetry file produced by Webots/Engine
TELEMETRY_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "robot_position.json")

@router.get("/robot-status")
def get_robot_status():
    """Returns the current state of the robot telemetry."""
    try:
        with open(TELEMETRY_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"error": "Telemetry file not found", "status": "offline"}

@router.get("/validators")
def get_validators():
    """Mock endpoint returning validator consensus status."""
    return [
        {"id": "val-1", "status": "active", "staked": 5000, "uptime": 99.9},
        {"id": "val-2", "status": "active", "staked": 2000, "uptime": 98.2},
        {"id": "val-3", "status": "syncing", "staked": 150, "uptime": 45.0},
    ]

@router.get("/tasks")
def get_tasks():
    """Mock endpoint returning current market tasks."""
    return [
        {"id": "task-A1", "type": "delivery", "reward": 5.0, "status": "open"},
        {"id": "task-B2", "type": "inspection", "reward": 12.5, "status": "in_progress"},
    ]
