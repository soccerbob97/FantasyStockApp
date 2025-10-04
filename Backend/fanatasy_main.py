from fastapi import FastAPI
import uvicorn
import requests
import datetime
import base64
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

API_KEY = os.getenv("ALPACA_API_KEY")
API_SECRET = os.getenv("ALPACA_API_SECRET")
BASE_URL = "https://broker-api.sandbox.alpaca.markets/v1"

# Headers for Alpaca API - properly encode credentials
credentials = base64.b64encode(f"{API_KEY}:{API_SECRET}".encode()).decode()
HEADERS = {
    "Authorization": f"Basic {credentials}",
    "Content-Type": "application/json"
}

# Create FastAPI instance
app = FastAPI()

# Basic routes
@app.get("/")
async def root():
    """Basic root endpoint"""
    return {"message": "Hello from Stock Fantasy App API!"}

@app.get("/test")
async def test_endpoint():
    """Test endpoint for Postman"""
    return {"status": "success", "data": "API is working correctly"}

@app.post("/test")
async def test_post():
    """Test POST endpoint for Postman"""
    return {"message": "POST request received successfully"}

# @app.post("/create_alpaca_user")
# def create_alpaca_user(user_data: dict):
#     url = f"{BASE_URL}/accounts"

#     # Agreements need a timestamp
#     now = datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"

#     payload = {
#     "contact": {
#         "email_address": "test1@gmail.com",
#         "phone_number": "+17065912538",
#         "street_address": ["123 Main Street"],
#         "city": "New York",
#         "state": "NY",
#         "postal_code": "10001",
#         "country": "US"
#     },
#     "identity": {
#         "given_name": "John",
#         "family_name": "Doe",
#         "date_of_birth": "1990-01-01",
#         "tax_id_type": "USA_SSN",
#         "tax_id": "123-45-6789",
#         "country_of_citizenship": "US",
#         "country_of_birth": "US",
#         "country_of_tax_residence": "US",
#         "funding_source": ["employment_income"]
#     },
#     "disclosures": {
#         "is_control_person": False,
#         "is_affiliated_exchange_or_finra": False,
#         "is_politically_exposed": False,
#         "immediate_family_exposed": False
#     },
#     "agreements": [
#         {
#         "agreement": "customer_agreement",
#         "signed_at": "2025-10-04T17:39:34Z",
#         "ip_address": "127.0.0.1"
#         },
#         {
#         "agreement": "privacy_policy",
#         "signed_at": "2025-10-04T17:39:34Z",
#         "ip_address": "127.0.0.1"
#         }
#     ]
#     }

#     # 1) Create account
#     r = requests.post(url, headers=HEADERS, data=payload)
#     print(r.status_code, r.text)
#     acct = r.json()
#     account_id = acct["id"]

#     # 2) Journal $10,000 cash into the new account (JNLC)
#     journal = {
#         "from_account_id": "YOUR_FIRM_ACCOUNT_ID",  # visible in Broker dashboard
#         "to_account_id": account_id,
#         "entry_type": "JNLC",
#         "amount": "10000"
#     }
#     jr = requests.post(f"{BASE_URL}/journals", headers=HEADERS, data=json.dumps(journal))
#     print(jr.status_code, jr.text)

@app.post("/create_alpaca_user")
def create_alpaca_user(user_data: dict):
    url = f"{BASE_URL}/accounts"

    # Agreements need a timestamp
    now = datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z"

    payload = {
        "contact": {
            "email_address": "test1@gmail.com",
            "phone_number": "+17065912538",
            "street_address": ["123 Main Street"],
            "city": "New York",
            "state": "NY",
            "postal_code": "10001",
            "country": "USA"
        },
        "identity": {
            "given_name": "John",
            "family_name": "Doe",
            "date_of_birth": "1990-01-01",
            "tax_id_type": "USA_SSN",
            "tax_id": "193-12-1362",
            "country_of_citizenship": "USA",
            "country_of_birth": "USA",
            "country_of_tax_residence": "USA",
            "funding_source": ["employment_income"]
        },
        "disclosures": {
            "is_control_person": False,
            "is_affiliated_exchange_or_finra": False,
            "is_politically_exposed": False,
            "immediate_family_exposed": False
        },
        "agreements": [
            {
            "agreement": "customer_agreement",
            "signed_at": "2025-10-04T17:39:34Z",
            "ip_address": "127.0.0.1"
            }
        ]
    }


    resp = requests.post(url, headers=HEADERS, json=payload)
    return resp.json()

# Run the app
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )