from fastapi import FastAPI
from routers.estimate import router as estimate_router

app = FastAPI(title="Traffic Density Estimation Service")

app.include_router(estimate_router, prefix="/api/estimate", tags=["Density Estimation"])