from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import rest, telemetry

app = FastAPI(title="RoboLedger Integration API", description="FastAPI layer for the robotics engine.")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rest.router)
app.include_router(telemetry.router)

@app.get("/")
def health_check():
    return {"status": "nominal", "service": "RoboLedger API Layer"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.server:app", host="0.0.0.0", port=8000, reload=True)
