# data_storage/db.py
import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client["traffic_db"]
density_collection = db["traffic_density"]

#save records func
def save_density_record(camera_id: str, density: float, timestamp: datetime, location: dict = None):
    doc = {
        "camera_id": camera_id,
        "timestamp": timestamp.isoformat(),
        "density": float(density),
    }
    if location:
        doc["location"] = location
    density_collection.insert_one(doc)