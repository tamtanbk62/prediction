from fastapi import FastAPI
from routers import cameras
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Camera Service")

app.include_router(cameras.router, prefix="/api/cameras", tags=["Cameras"])