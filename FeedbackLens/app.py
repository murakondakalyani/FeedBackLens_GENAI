from flask import Flask, render_template, request

from utils.cleaner import clean_reviews
from utils.data_loader import fetch_external_reviews, load_internal_reviews
from utils.llm import analyze_reviews, categorize_issues, extract_keywords, generate_insight
from utils.memory import compare_trends, load_mementos, save_memento
from utils.visuals import generate_graph


app = Flask(__name__)


def run_analysis():
    reviews = []

    if "file" in request.files and request.files["file"].filename:
        reviews += load_internal_reviews(request.files["file"])

    url = request.form.get("url")
    if url:
        try:
            external_text = fetch_external_reviews(url)
            reviews += external_text.split(".")
        except Exception:
            print("Error fetching external reviews")

    if not reviews:
        return None

    cleaned = clean_reviews(reviews)
    sentiment, score = analyze_reviews(cleaned)
    keywords = extract_keywords(cleaned)
    insight = generate_insight(sentiment, score, keywords)
    issues = categorize_issues(cleaned)

    save_memento(insight)
    trends = compare_trends(insight, load_mementos())
    generate_graph(trends)

    return {
        "sentiment": sentiment,
        "score": score,
        "total": len(cleaned),
        "insight": insight,
        "keywords": keywords,
        "trends": trends,
        "issues": issues,
    }


@app.route("/")
def index():
    return render_template("index.html", active_page="dashboard")


@app.route("/scanner", methods=["GET", "POST"])
def scanner():
    if request.method == "POST":
        result = run_analysis()
        if result is None:
            return render_template(
                "scanner.html",
                active_page="scanner",
                error="Please upload a CSV or provide a URL!",
            )
        return render_template("analytics.html", active_page="analytics", **result)

    return render_template("scanner.html", active_page="scanner")


@app.route("/analytics")
def analytics():
    return render_template("analytics.html", active_page="analytics")


@app.route("/visual")
def visual():
    return render_template("visual.html", active_page="visual")


@app.route("/insights")
def insights():
    return render_template("insights.html", active_page="insights")


@app.route("/settings")
def settings():
    return render_template("settings.html", active_page="settings")


if __name__ == "__main__":
    app.run(debug=True)
