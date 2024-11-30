import sqlite3

connection = sqlite3.connect('database.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO books (title, author, written) VALUES (?, ?, ?)",
            ('Przedwiośnie', 'Stefan Żeromski, 1924')
            )

connection.commit()
connection.close()