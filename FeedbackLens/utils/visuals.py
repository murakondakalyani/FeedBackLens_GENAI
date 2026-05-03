import matplotlib.pyplot as plt

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