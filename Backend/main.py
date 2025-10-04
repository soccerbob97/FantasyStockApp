
from fastapi import FastAPI, HTTPException
import uvicorn
import requests
from datetime import datetime, timedelta
from typing import Optional
from apify_client import ApifyClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Finnhub API configuration
FINNHUB_API_KEY = os.getenv("FINNHUB_API_KEY")
FINNHUB_BASE_URL = "https://finnhub.io/api/v1"

# Create FastAPI instance
app = FastAPI()
APIFY_API_TOKEN = os.getenv("APIFY_API_TOKEN")
client = ApifyClient(APIFY_API_TOKEN)

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

@app.get("/get_company_news")
async def get_company_news(symbol: str, days_back: Optional[int] = 2):
    """
    Get current news for a given company symbol
    
    Args:
        symbol: Stock symbol (e.g., 'AAPL', 'TSLA', 'MSFT')
        days_back: Number of days back to fetch news (default: 7)
    
    Returns:
        JSON response with news articles
    """
    try:
        # Calculate date range
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days_back)
        
        # Format dates for API (YYYY-MM-DD)
        from_date = start_date.strftime("%Y-%m-%d")
        to_date = end_date.strftime("%Y-%m-%d")
        
        # Finnhub company news endpoint
        url = f"{FINNHUB_BASE_URL}/company-news"
        params = {
            "symbol": symbol.upper(),
            "from": from_date,
            "to": to_date,
            "token": FINNHUB_API_KEY
        }
        
        # Make API request
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            news_data = response.json()
            
            # Format the response
            formatted_news = []
            for article in news_data[:10]:  # Limit to 10 most recent articles
                formatted_article = {
                    "id": article.get("id"),
                    "headline": article.get("headline"),
                    "summary": article.get("summary"),
                    "source": article.get("source"),
                    "url": article.get("url"),
                    "image": article.get("image"),
                    "datetime": datetime.fromtimestamp(article.get("datetime", 0)).isoformat() if article.get("datetime") else None,
                    "category": article.get("category"),
                    "related": article.get("related")
                }
                formatted_news.append(formatted_article)
            
            return {
                "symbol": symbol.upper(),
                "news_count": len(formatted_news),
                "date_range": {
                    "from": from_date,
                    "to": to_date
                },
                "news": formatted_news
            }
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail=f"Finnhub API error: {response.text}"
            )
            
    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Request failed: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/get_website_content")
async def get_website_content(url: str):
    """
    Get current news for a given company symbol
    
    Args:
        symbol: Stock symbol (e.g., 'AAPL', 'TSLA', 'MSFT')
        days_back: Number of days back to fetch news (default: 7)
    
    Returns:
        JSON response with news articles
    """
    run_input = {
        "startUrls": [{ "url": url }],
        "useSitemaps": False,
        "respectRobotsTxtFile": True,
        "crawlerType": "playwright:adaptive",
        "includeUrlGlobs": [],
        "excludeUrlGlobs": [],
        "keepUrlFragments": False,
        "ignoreCanonicalUrl": False,
        "ignoreHttpsErrors": False,
        "maxCrawlDepth": 20,
        "maxCrawlPages": 9999999,
        "initialConcurrency": 0,
        "maxConcurrency": 200,
        "initialCookies": [],
        "proxyConfiguration": { "useApifyProxy": True },
        "maxSessionRotations": 10,
        "maxRequestRetries": 3,
        "requestTimeoutSecs": 60,
        "minFileDownloadSpeedKBps": 128,
        "dynamicContentWaitSecs": 10,
        "waitForSelector": "",
        "softWaitForSelector": "",
        "maxScrollHeightPixels": 5000,
        "keepElementsCssSelector": "",
        "removeElementsCssSelector": """nav, footer, script, style, noscript, svg, img[src^='data:'],
        [role=\"alert\"],
        [role=\"banner\"],
        [role=\"dialog\"],
        [role=\"alertdialog\"],
        [role=\"region\"][aria-label*=\"skip\" i],
        [aria-modal=\"true\"]""",
        "removeCookieWarnings": True,
        "blockMedia": True,
        "expandIframes": True,
        "clickElementsCssSelector": "[aria-expanded=\"false\"]",
        "htmlTransformer": "readableText",
        "readableTextCharThreshold": 100,
        "aggressivePrune": False,
        "debugMode": False,
        "debugLog": False,
        "saveHtml": False,
        "saveHtmlAsFile": False,
        "saveMarkdown": True,
        "saveFiles": False,
        "saveScreenshots": False,
        "maxResults": 9999999,
        "clientSideMinChangePercentage": 15,
        "renderingTypeDetectionPercentage": 10,
    }

    # Run the Actor and wait for it to finish
    run = client.actor("aYG0l9s7dbB7j3gbS").call(run_input=run_input)
    text_content = []
    
    # Fetch and extract only the text content from each item
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        if "text" in item:
            text_content.append(item["text"])
    
    # Return just the text content as a single string or list
    if len(text_content) == 1:
        return {"content": text_content[0]}
    else:
        return {"content": text_content}

def get_personalized_analysis(symbol: str, content: str):
    print("hello")
    


# Run the app
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
