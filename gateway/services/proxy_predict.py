import httpx

PREDICT_URL = "http://127.0.0.1:8003/api/predict"

async def predict_density(data: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(PREDICT_URL + "/", json=data)
        response.raise_for_status()
        return response.json()