import pandas as pd
import requests
import os

def load_internal_reviews(file):
    df = pd.read_csv(file)
    return df.iloc[:, 0].dropna().tolist()

def fetch_external_reviews(url):
    api_key = os.getenv("FIRECRAWL_API_KEY")

    response = requests.post(
        "https://api.firecrawl.dev/v1/scrape",
        headers={"Authorization": f"Bearer {api_key}"},
        json={"url": url}
    )

    data = response.json()
    return data.get("text", "")