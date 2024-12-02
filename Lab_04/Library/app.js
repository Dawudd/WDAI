const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = '1b8170cca1eefc2440fc346f87c08091e64a417c7ad3881f95d663101026c90cc45acc42bd317dcc4c75925b8c4a7b856b4bbea4149b73ca35afdb516674d382e1d3b39cfab2933974947c1db0ee90aeac993f51af4760f0d1c3901c04b888790697b64029f7cf316e946033d48701e91114dc6b7d9de56bd1633d9f88c0ce90b1fdb455811892044131673b342e945a1ac73b09a730c0b09d0e2401597fdf7385f742609c7bfbe6352f877b60290e6284b44b60154e03e78386294fe9da736df30ffb629bb1ac01bb84677ece75d64d96f1db2978ee85f2738350a21d237d5200b5942f0386a284b5ecb8c29d6c435e2627c8097308f606eb3bd48bf4bd376e';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Brak tokenu. Dostęp zabroniony.' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Nieprawidłowy token.' });
        }
        req.user = user;
        next();
    });
}

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err.message);
    }
});

db.serialize(() => {
    // Books
    db.run('CREATE TABLE IF NOT EXISTS Books (BookID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT NOT NULL, Author TEXT NOT NULL, Year INTEGER NOT NULL)', (err) => {
        if (err) {
            console.error('Błąd podczas tworzenia tabeli Books:', err.message);
        }
    });
    // Orders
    db.run('CREATE TABLE IF NOT EXISTS Orders (OrderID INTEGER PRIMARY KEY AUTOINCREMENT, BookID INTEGER NOT NULL, UserID INTEGER NOT NULL, Amount INTEGER NOT NULL, FOREIGN KEY(BookID) REFERENCES Books(BookID), FOREIGN KEY(UserID) REFERENCES Users(UserID))', (err) => {
        if (err) {
            console.error('Błąd podczas tworzenia tabeli Orders:', err.message);
        }
    });
    // Users
    db.run('CREATE TABLE IF NOT EXISTS Users (UserID INTEGER PRIMARY KEY AUTOINCREMENT, Email TEXT NOT NULL, Password TEXT NOT NULL)', (err) => {
        if (err) {
            console.error('Błąd podczas tworzenia tabeli Users:', err.message);
        }
    });
});

// Endpoint GET zwracający wszystkie książki
app.get('/api/books', (req, res) => {
    db.all('SELECT * FROM Books', [], (err, rows) => {
        if (err) {
            console.error('Błąd zapytania:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else {
            res.json(rows);
        }
    });
});

// Endpoint GET zwracający książkę po jej ID
app.get('/api/books/:BookID', (req, res) => {
    const bookId = req.params.BookID;
    db.get('SELECT * FROM Books WHERE BookID = ?', [bookId], (err, book) => {
        if (err) {
            console.error('Błąd zapytania:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else if (!book) {
            res.status(404).json({ error: 'Książka o podanym ID nie została znaleziona' });
        } else {
            res.json(book);
        }
    });
});

// Endpoint POST do dodawania książek
app.post('/api/books', authenticateToken, (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Wszystkie pola (Title, Author, Year) są wymagane.' });
    }
    const query = `INSERT INTO Books (Title, Author, Year) VALUES (?, ?, ?)`;
    db.run(query, [title, author, year], function (err) {
        if (err) {
            console.error('Błąd podczas dodawania książki:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else {
            res.status(201).json({ 
                BookID: this.lastID
            });
        }
    });
});

// Endpoint DELETE do usuwania książek po ID
app.delete('/api/books/:BookID', authenticateToken, (req, res) => {
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

// Endpoint GET do pobierania zamówień użytkownika po jego ID
app.get('/api/orders/:UserID', (req, res) => {
    const userID = req.params.UserID;
    const query = 'SELECT OrderID, BookID, Amount FROM Orders WHERE UserID = ?';
    db.all(query, [userID], (err, rows) => {
        if (err) {
            console.error('Błąd podczas pobierania zamówień użytkownika:', err.message);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        res.status(200).json(rows);
    });
});

// Endpoint POST do wstawienie nowego zamówienia do tabeli
app.post('/api/orders', authenticateToken, (req, res) => {
    const { BookID, Amount } = req.body;
    const UserID = req.user.id;
    if (!BookID || !Amount) {
        return res.status(400).json({ error: 'Wszystkie pola (BookID, Amount) są wymagane.' });
    }
    const query = `INSERT INTO Orders (BookID, UserID, Amount) VALUES (?, ?, ?)`;
    db.run(query, [BookID, UserID, Amount], function (err) {
        if (err) {
            console.error('Błąd podczas dodawania zamówienia:', err.message);
            res.status(500).json({ error: 'Błąd serwera' });
        } else {
            res.status(201).json({ 
                OrderID: this.lastID
            });
        }
    });
})

// Endpoint DELETE do usuwania zamówienia po ID
app.delete('/api/orders/:OrderID', authenticateToken, (req, res) => {
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

// Endpoint PATCH do zmiany zamówienia po ID
app.patch('/api/orders/:OrderID', authenticateToken, (req, res) => {
    const orderId = req.params.OrderID; // Pobranie ID zamówienia z URL
    const { BookID, Amount } = req.body; // Pobranie danych do aktualizacji z ciała żądania
    let updates = [];
    let params = [];
    if (BookID !== undefined) {
        updates.push('BookID = ?');
        params.push(BookID);
    }
    if (Amount !== undefined) {
        updates.push('Amount = ?');
        params.push(Amount);
    }
    if (updates.length === 0) {
        console.log(Amount + ' ' + BookID)
        return res.status(400).json({ error: 'Brak danych do aktualizacji.' });
    }
    const query = `UPDATE Orders SET ${updates.join(', ')} WHERE OrderID = ?`;
    params.push(orderId);
    db.run(query, params, function (err) {
        if (err) {
            console.error('Błąd podczas aktualizacji zamówienia:', err.message);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Nie znaleziono zamówienia do zaktualizowania.' });
        }
        res.status(200).json({
            message: `Zamówienie o ID ${orderId} zostało zaktualizowane.`
        });
    });
});

// Endpoint POST do rejestracji
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email i hasło są wymagane.' });
    }
    const checkUserQuery = 'SELECT * FROM Users WHERE Email = ?';
    db.get(checkUserQuery, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        if (user) {
            return res.status(400).json({ error: 'Użytkownik o tej nazwie już istnieje.' });
        }
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Błąd serwera' });
            }
            const insertUserQuery = 'INSERT INTO Users (Email, Password) VALUES (?, ?)';
            db.run(insertUserQuery, [email, hashedPassword], function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Błąd serwera' });
                }
                res.status(201).json({ UserID: this.lastID });
            });
        });
    });
});

// Endpoint POST do logowania
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email i hasło są wymagane.' });
    }
    const query = 'SELECT * FROM Users WHERE Email = ?';
    db.get(query, [email], (err, user) => {
        if (err) {
            console.error('Błąd zapytania:', err.message);
            return res.status(500).json({ error: 'Błąd serwera' });
        }
        if (!user) {
            return res.status(404).json({ error: 'Nieprawidłowy email lub hasło.' });
        }
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                console.error('Błąd podczas sprawdzania hasła:', err.message);
                return res.status(500).json({ error: 'Błąd serwera' });
            }
            if (!isMatch) {
                return res.status(401).json({ error: 'Nieprawidłowa nazwa użytkownika lub hasło.' });
            }
            const token = jwt.sign({ id: user.UserID, email: user.Email }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        });
    });
});


app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`)
})

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