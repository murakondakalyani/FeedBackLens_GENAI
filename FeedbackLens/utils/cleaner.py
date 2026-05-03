import re

def clean_reviews(reviews):
    cleaned = []
    for r in reviews:
        r = re.sub(r'[^a-zA-Z0-9\s]', '', str(r))
        cleaned.append(r.lower())
    return cleaned