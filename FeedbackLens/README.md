FeedBackLens – AI-Powered Customer Review Analysis
Overview

FeedBackLens is an AI-powered sentiment analysis platform that helps businesses, researchers, and product teams understand customer feedback from uploaded review datasets or online review sources. The system automatically analyzes reviews, identifies sentiment, extracts keywords, detects recurring issues, generates actionable insights, and visualizes trends.

The project combines Natural Language Processing (NLP), Large Language Models (LLMs), and data visualization to transform raw customer feedback into meaningful business intelligence.

Features
Review Collection
Upload customer reviews through CSV files
Fetch reviews from external URLs
Support for multiple review sources
Sentiment Analysis
Classifies reviews into:
Positive
Negative
Neutral
Generates sentiment scores
AI-Powered Insights
Extracts important keywords
Identifies common customer concerns
Generates business recommendations
Summarizes customer opinions
Trend Analysis
Stores previous analysis results
Compares current feedback with historical trends
Tracks sentiment changes over time
Data Visualization
Trend graphs
Sentiment charts
Analytics dashboard
Interactive Dashboard
Clean web interface built using Flask
Analytics and visualization pages
User-friendly review scanner
Technology Stack
Frontend
HTML5
CSS3
JavaScript
Backend
Python
Flask
AI & NLP
OpenAI API
TextBlob
Data Processing
Pandas
Requests
Visualization
Matplotlib
Project Structure
FeedBackLens/
│
├── app.py
├── requirements.txt
├── memory.json
│
├── templates/
│   ├── index.html
│   ├── scanner.html
│   ├── analytics.html
│   ├── visual.html
│   ├── insights.html
│   └── settings.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   ├── pie_chart.png
│   └── bar_chart.png
│
├── utils/
│   ├── cleaner.py
│   ├── data_loader.py
│   ├── llm.py
│   ├── memory.py
│   └── visuals.py
│
└── datasets/
Workflow
User uploads a review dataset or enters a review URL.
Reviews are cleaned and preprocessed.
Sentiment analysis is performed.
Important keywords are extracted.
Customer issues are categorized.
AI generates business insights.
Results are stored for trend comparison.
Visual charts and analytics are displayed.
Installation
Clone Repository
git clone https://github.com/yourusername/FeedBackLens.git
cd FeedBackLens
Create Virtual Environment
python -m venv venv
Activate Environment

Windows:

venv\Scripts\activate

Linux/Mac:

source venv/bin/activate
Install Dependencies
pip install -r requirements.txt
Install TextBlob Corpora
python -m textblob.download_corpora
Configure API Key

Windows PowerShell:

$env:OPENAI_API_KEY="YOUR_OPENAI_API_KEY"

Linux/Mac:

export OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
Running the Application
python app.py

Open your browser:

http://127.0.0.1:5000
Supported Review Sources
E-Commerce Platforms
Amazon Reviews
Flipkart Reviews
Restaurant Reviews
Zomato Reviews
Mobile Applications
Google Play Store Reviews
Custom CSV Files

Example format:

review
Great product and fast delivery
Excellent customer support
Poor packaging quality
Example Use Cases
E-Commerce Analysis
Product satisfaction tracking
Customer issue detection
Feature improvement suggestions
Restaurant Feedback
Food quality analysis
Service evaluation
Customer experience monitoring
App Review Monitoring
Bug identification
Feature request extraction
User satisfaction measurement
Future Enhancements
Real-time review monitoring
Multi-language sentiment analysis
Advanced dashboards
User authentication
Review source integrations
Predictive customer satisfaction analytics
Export reports as PDF
Learning Outcomes

This project demonstrates:

Natural Language Processing (NLP)
Sentiment Analysis
Prompt Engineering
OpenAI API Integration
Data Visualization
Flask Web Development
Customer Feedback Analytics
Trend Analysis Systems


Project Type: Generative AI + NLP + Sentiment Analysis Platform

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

fc-1db92eb1546f4846a2cef39b5226a872

$env:OPENAI_API_KEY="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"
$env:FIRECRAWL_API_KEY="fc-1db92eb1546f4846a2cef39b5226a872"

pip install flask pandas requests openai

pip install textblob
python -m textblob.download_corpora

🛒 E-commerce reviews
https://www.amazon.in/product-reviews/B0XXXX
https://www.flipkart.com/product-reviews/XXXX
🍽 Restaurant reviews
https://www.zomato.com/your-city/restaurant-name/reviews
📱 App reviews (web version)
https://play.google.com/store/apps/details?id=app_name&showAllReviews=true
