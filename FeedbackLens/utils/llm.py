from textblob import TextBlob
from collections import Counter
import re
import matplotlib.pyplot as plt


# 🔹 Clean text (basic preprocessing)
def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text

def generate_graph(trends):
    labels = ['Positive', 'Negative', 'Neutral']
    values = [
        trends['positive'],
        trends['negative'],
        trends['neutral']
    ]

    # Bar Chart
    plt.figure()
    plt.bar(labels, values)
    plt.title("Sentiment Trends")
    plt.savefig("static/bar_chart.png")
    plt.close()

    # Pie Chart
    plt.figure()
    plt.pie(values, labels=labels, autopct='%1.1f%%')
    plt.title("Sentiment Distribution")
    plt.savefig("static/pie_chart.png")
    plt.close()

# 🔹 Sentiment Analysis
def analyze_reviews(reviews):
    sentiments = []

    for review in reviews:
        cleaned = preprocess(review)
        polarity = TextBlob(cleaned).sentiment.polarity
        sentiments.append(polarity)

    avg_score = sum(sentiments) / len(sentiments) if sentiments else 0

    # Determine sentiment label
    if avg_score > 0.1:
        sentiment = "Positive 😊"
    elif avg_score < -0.1:
        sentiment = "Negative 😡"
    else:
        sentiment = "Neutral 😐"

    return sentiment, round(avg_score, 2)


# 🔹 Keyword Extraction (Top Issues / Topics)
def extract_keywords(reviews):
    words = []

    for review in reviews:
        cleaned = preprocess(review)
        words.extend(cleaned.split())

    # Remove common useless words
    stopwords = {
        "the", "is", "and", "was", "are", "to", "of", "for",
        "a", "in", "on", "it", "this", "that", "very", "with"
    }

    filtered_words = [w for w in words if w not in stopwords and len(w) > 2]

    common = Counter(filtered_words).most_common(5)

    return [word for word, count in common]


# 🔹 Generate Insight Text (Professional Output)
def generate_insight(sentiment, score, keywords):
    insight = f"""
Overall Sentiment: {sentiment}
Average Score: {score}

Key Observations:
"""

    if sentiment.startswith("Positive"):
        insight += "- Customers are generally satisfied.\n"
    elif sentiment.startswith("Negative"):
        insight += "- Customers are facing issues.\n"
    else:
        insight += "- Mixed feedback observed.\n"

    if keywords:
        insight += "\nTop Topics:\n"
        for k in keywords:
            insight += f"- {k}\n"

    return insight

def categorize_issues(reviews):
    categories = {
        "delivery": 0,
        "quality": 0,
        "service": 0,
        "price": 0
    }

    for review in reviews:
        r = review.lower()

        if "delivery" in r or "late" in r:
            categories["delivery"] += 1
        if "quality" in r or "broken" in r:
            categories["quality"] += 1
        if "support" in r or "service" in r:
            categories["service"] += 1
        if "price" in r or "cost" in r:
            categories["price"] += 1

    return categories