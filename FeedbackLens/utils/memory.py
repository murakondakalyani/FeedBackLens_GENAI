import json
import datetime

MEMORY_FILE = "memory.json"

def save_memento(insight):
    entry = {
        "timestamp": str(datetime.datetime.now()),
        "insight": insight
    }

    try:
        with open(MEMORY_FILE, "r") as f:
            data = json.load(f)
    except:
        data = []

    data.append(entry)

    with open(MEMORY_FILE, "w") as f:
        json.dump(data, f, indent=4)

def load_mementos():
    try:
        with open(MEMORY_FILE, "r") as f:
            return json.load(f)
    except:
        return []

def compare_trends(current, past_data):
    positive = 0
    negative = 0
    neutral = 0

    for entry in past_data:
        text = entry['insight'].lower()

        if "positive" in text:
            positive += 1
        elif "negative" in text:
            negative += 1
        else:
            neutral += 1

    return {
        "positive": positive,
        "negative": negative,
        "neutral": neutral
    }