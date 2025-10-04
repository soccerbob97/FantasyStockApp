from fastapi import FastAPI
import uvicorn

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

# Run the app
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )