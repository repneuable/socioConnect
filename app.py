# if port 5000 in use already, try: export [FLASK_RUN_PORT=8080] before [flask run]
from flask import Flask, render_template, request, jsonify
import csv
import sqlite3
import datetime

app = Flask(__name__)

# Flask route to render homepage


@app.route("/")
def home():
    return render_template('index.html')

# Flask route to render About Us page


@app.route('/about')
def about():
    return render_template('about.html')

# Flask route to render Product Features page


@app.route("/features")
def features():
    return render_template('features.html')

# Flask route to render Signup Page


@app.route('/signup')
def signup():
    return render_template('signup.html')

# Flask route to handle Signup form submissions


@app.route('/submit-form', methods=['POST'])
def submit_form():
    fname = request.form['first-name']
    lname = request.form['last-name']
    email = request.form['email']
    date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

 # Store the form data in the database
    with sqlite3.connect('database.db') as conn:
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS signups (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fname TEXT,
                lname TEXT,
                email TEXT, 
                date TEXT
            )
        ''')
        c.execute('INSERT INTO signups (fname, lname, email, date) VALUES (?, ?, ?, ?)',
                  (fname, lname, email, date))
        conn.commit()
    conn.close()

    return 'Success!'


# Flask route to handle Donation form payments
@app.route('/submit-donation', methods=['POST'])
def submit_donation():
    fname = request.form['first-name']
    lname = request.form['last-name']
    email = request.form['donation-email']
    # payment = request.form['amount']
    # payment = request.form['selected-amount'] if 'selected-amount' in request.form else request.form['amount']
    if 'custom' in request.form['selected-amount']:
        payment = request.form['amount']
    else:
        payment = request.form['selected-amount']

    date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

 # Store the payment data in the database
    with sqlite3.connect('database.db') as conn:
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS donations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fname TEXT,
                lname TEXT,
                email TEXT,
                payment INT, 
                date TEXT
            )
        ''')
        c.execute('INSERT INTO donations (fname, lname, email, payment, date) VALUES (?, ?, ?, ?, ?)',
                  (fname, lname, email, payment, date))
        conn.commit()
    conn.close()

    return 'Thank you for your support!'

# Flask route to provide SQLite data to Chart.js when rendered


@app.route('/get-data')
def get_data():

    # Connect to the database
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    # Fetch data from the signups table
    c.execute('''SELECT id, date FROM signups ORDER BY date ASC''')
    rows = c.fetchall()

    # Fetch the count of rows in the table
    c.execute('''SELECT COUNT(*) FROM signups''')
    row_count = c.fetchone()[0]

    c.close()

    return jsonify(rows=rows, count=row_count)



# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
