from fastapi import FastAPI
from routers import camera, estimate

app = FastAPI(title="Traffic Gateway")

app.include_router(camera.router, prefix="/api/cameras", tags=["Camera"])
app.include_router(estimate.router, prefix="/api/estimate", tags=["Estimate"])