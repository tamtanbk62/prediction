# Traffic Prediction System
...

## Cài đặt
1. Clone the repository:
   ```bash
   git clone https://github.com/tamtanbk62/prediction.git
   ```

2. Tạo môi trường ảo:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # For Mac/Linux
   .venv\Scripts\activate     # For Windows
   pip install -r requirements.txt
   ```
3. Cài đặt dependencies
   ```bash
   cd {service_name} #eg. camera_service
   pip install -r requirements.txt
   ```
3. Run frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Run API:
   ```bash
   cd camera_service
   uvicorn app:app --reload --port 8001
   cd density_estimation
   uvicorn app:app --reload --port 8002
   cd denstiy_prediction
   uvicorn app:app --reload --port 8003
   cd gateway
   uvicorn app:app --reload --port 8000
   ```
