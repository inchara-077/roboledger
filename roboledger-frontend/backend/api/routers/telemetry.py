from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from api.core.websocket_manager import manager
import asyncio
import json
import os

router = APIRouter()

TELEMETRY_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "robot_position.json")

@router.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        last_mtime = 0
        while True:
            # Check if file was modified to avoid sending duplicate data unnecessarily
            try:
                current_mtime = os.path.getmtime(TELEMETRY_FILE)
                if current_mtime > last_mtime:
                    last_mtime = current_mtime
                    with open(TELEMETRY_FILE, "r") as f:
                        data = json.load(f)
                        await websocket.send_json({"type": "TELEMETRY_UPDATE", "data": data})
            except FileNotFoundError:
                pass
            except json.JSONDecodeError:
                pass
                
            await asyncio.sleep(0.5) # 2Hz polling for changes
    except WebSocketDisconnect:
        manager.disconnect(websocket)
