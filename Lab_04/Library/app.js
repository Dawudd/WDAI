const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Tworzenie lub podłączanie do bazy danych
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err.message);
    } else {
        console.log('Połączono z bazą danych SQLite.');
    }
});

// Opcjonalnie: wykonaj zapytanie testowe
db.serialize(() => {
    // Books
    db.run('CREATE TABLE IF NOT EXISTS Books (BookID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, Author TEXT NOT NULL, Year INTEGER NOT NULL)', (err) => {
        if (err) {
            console.error('Błąd podczas tworzenia tabeli Books:', err.message);
        } else {
            console.log('Tabela Books została utworzona (jeśli wcześniej nie istniała).');
        }
    });
    // Orders
    db.run('CREATE TABLE IF NOT EXISTS Orders (OrderID INTEGER PRIMARY KEY AUTOINCREMENT, BookID INTEGER NOT NULL, Amount INTEGER NOT NULL, FOREIGN KEY(BookID) REFERENCES Books(BookID))', (err) => {
        if (err) {
            console.error('Błąd podczas tworzenia tabeli Orders:', err.message);
        } else {
            console.log('Tabela Orders została utworzona (jeśli wcześniej nie istniała).');
        }
    });
    // Users
    db.run('CREATE TABLE IF NOT EXISTS Users (UserID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT NOT NULL, Password TEXT NOT NULL)', (err) => {
        if (err) {
            console.error('Błąd podczas tworzenia tabeli Users:', err.message);
        } else {
            console.log('Tabela Users została utworzona (jeśli wcześniej nie istniała).');
        }
    });
});

// Endpoint GET /api/books
app.get('/api/books', (req, res) => {
    db.all('SELECT * FROM Books', [], (err, rows) => {
        if (err) {
            console.error('Błąd zapytania:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else {
            res.json(rows); // Zwracamy wyniki w formacie JSON
        }
    });
});

// Endpoint GET /api/books/:id
app.get('/api/books/:BookID', (req, res) => {
    const bookId = req.params.id; // Pobranie ID z URL
    db.get('SELECT * FROM Books WHERE BookID = ?', [bookId], (err, row) => {
        if (err) {
            console.error('Błąd zapytania:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else if (!row) {
            res.status(404).json({ error: 'Książka o podanym ID nie została znaleziona' });
        } else {
            res.json(row); // Zwracamy znalezioną książkę w formacie JSON
        }
    });
});

app.use(bodyParser.json());
// Endpoint POST do dodawania książek
app.post('/api/books', (req, res) => {
    const { Title, Author, Year } = req.body;
    //console.log('Odebrane dane:', req.body);
    // Walidacja danych
    if (!Title || !Author || !Year) {
        return res.status(400).json({ error: 'Wszystkie pola (Title, Author, Year) są wymagane.' });
    }

    // Wstawienie nowej książki do tabeli
    const query = `INSERT INTO Books (Title, Author, Year) VALUES (?, ?, ?)`;
    db.run(query, [Title, Author, Year], function (err) {
        if (err) {
            console.error('Błąd podczas dodawania książki:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else {
            res.status(201).json({ 
                message: 'Książka została dodana.',
                book: { id: this.lastID, Title, Author, Year } 
            });
        }
    });
});

// Endpoint DELETE: Usuń książkę po ID
app.delete('/api/books/:BookID', (req, res) => {
    const bookId = req.params.BookID;

    const query = 'DELETE FROM Books WHERE BookID = ?';
    db.run(query, [bookId], function (err) {
        if (err) {
            console.error('Błąd podczas usuwania książki:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Książka o podanym ID nie została znaleziona.' });
        } else {
            res.status(200).json({ message: `Książka o ID ${bookId} została usunięta.` });
        }
    });
});

// Endpoint GET: Pobierz zamówienia użytkownika po jego ID
app.get('/api/orders/:UserID', (req, res) => {
    const userID = req.params.UserID;

    const query = 'SELECT * FROM Orders WHERE UserID = ?';
    db.run(query, [userID], function (err) {
        if (err) {
            console.error('Błąd podczas pobierania zamówień użytkownika:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Użytkownik o podanym ID nie został znaleziony.' });
        }
    });
})

// Wstawienie nowego zamówienia do tabeli
app.post('/api/orders', (req, res) => {
    const { BookID, Amount } = req.body;

    if (!BookID || !Amount) {
        return res.status(400).json({ error: 'Wszystkie pola (BookID, Amount) są wymagane.' });
    }

    const query = `INSERT INTO Orders (BookID, Amount) VALUES (?, ?)`;
    db.run(query, [BookID, Amount], function (err) {
        if (err) {
            console.error('Błąd podczas dodawania zamówienia:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else {
            res.status(201).json({ 
                message: 'Zamówienie zostało dodane.',
                order: { id: this.lastID, BookID, Amount } 
            });
        }
    });
})

// Endpoint DELETE: Usuń zamówienie po ID
app.delete('/api/orders/:OrderID', (req, res) => {
    const orderID = req.params.OrderID;

    const query = 'DELETE FROM Orders WHERE OrderID = ?';
    db.run(query, [orderID], function (err) {
        if (err) {
            console.error('Błąd podczas usuwania zamówienia:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Zamówienie o podanym ID nie zostało znalezione.' });
        } else {
            res.status(200).json({ message: `Zamówienie o ID ${orderID} została usunięta.` });
        }
    });
});

// Endpoint PATCH: Zmień zamówienie po ID

// Users

// Endpoint POST: Rejestracja użytkownika
app.post('/api/register', (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ error: 'Wszystkie pola (Email, Password) są wymagane.' });
    }

    const query = `INSERT INTO Users (Email, Password) VALUES (?, ?)`;
    db.run(query, [Email, Password], function (err) {
        if (err) {
            console.error('Błąd podczas rejestracji użytkownika:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else {
            res.status(201).json({ 
                message: 'Użytkownik został dodany.',
                user: { id: this.lastID, Email, Password } 
            });
        }
    });
})

// Endpoint POST: Logowanie

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Zamknięcie połączenia z bazą
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Błąd zamykania połączenia:', err.message);
        } else {
            console.log('Połączenie z bazą danych zostało zamknięte.');
        }
        process.exit();
    });
});