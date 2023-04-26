# if port 5000 in use already, try: export FLASK_RUN_PORT=8080
from flask import Flask, render_template, request, jsonify
import csv
import sqlite3
import datetime

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')
# def data():
    # data = []
    # with open('data.csv') as csvfile:
    #    reader = csv.reader(csvfile)
    #    for row in reader:
    #        data.append(row)
    # return jsonify(data)


@app.route("/features")
def features():
    return render_template('features.html')


@app.route('/signup')
def signup():
    return render_template('signup.html')

# Flask route to handle form submissions
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

# Flask route to provide SQLite data to Chart.js when rendered
@app.route('/get-data')
def get_data():

    # Connect to the database
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    # Fetch data from the signups table
    c.execute('''SELECT id, date FROM signups ORDER BY date ASC''')
    rows = c.fetchall()
    c.close()

    return jsonify(rows)


# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*
# ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*


# UNUSED YET
@app.route("/hello/<name>")
def hello_there(name=None):
    return render_template("hello_there.html", username=name)

# UNUSED YET


@app.route("/db")
def test_db():
    conn = sqlite3.connect('database.db')
    print('Opened database successfully', flush=True)

    conn.execute('DROP TABLE IF EXISTS students')
    conn.commit()
    conn.execute(
        'CREATE TABLE students (name TEXT, addr TEXT, city TEXT, zip TEXT)')
    print('Table created successfully', flush=True)
    conn.close()
    return "Table created successfully"


@app.route('/addrec', methods=['POST', 'GET'])
def addrec():
    if request.method == 'POST':
        try:
            nm = request.form['nm']
            addr = request.form['add']
            city = request.form['city']
            zip = request.form['zip']

            with sqlite3.connect("database.db") as con:
                cur = con.cursor()
                cur.execute(
                    "INSERT INTO students (name,addr,city,zip)VALUES (?,?,?,?)", (nm, addr, city, zip))

                con.commit()
                msg = "Record successfully added"
        except:
            con.rollback()
            msg = "error in insert operation"

        finally:
            con.close()
            return render_template("result.html", msg=msg)

# UNUSED YET


@app.route('/list')
def list():
    con = sqlite3.connect("database.db")
    con.row_factory = sqlite3.Row

    cur = con.cursor()
    cur.execute("select * from students")

    rows = cur.fetchall()
    return render_template("list.html", rows=rows)
