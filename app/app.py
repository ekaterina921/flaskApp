import random

from flask import Flask

app = Flask(__name__)


@app.route('/index')
def hello():
    return "Hello"


@app.route('/moreload')
def moreload():
    # Generate an array of 1000 random integers
    random_integers = [random.randint(1, 1000) for _ in range(1000)]

    # Calculate the sum of the random integers
    total_sum = sum(random_integers)

    return str(total_sum)
