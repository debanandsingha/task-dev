const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const path = require('path');
const fs = require('fs');

// Construct the absolute path to the database file
const dbPath = path.resolve(__dirname, './backend/db/database.db');

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE , (err) => {
    if (err) {
        console.error("Error connecting to database: ", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Basic route handling
    if (req.method === 'GET' && req.url === '/api/data') {
        const sql = 'SELECT * FROM users';
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error("Error executing SQL query: ", err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data: rows }));
        });
    } else if (req.method === 'POST' && req.url === '/signup') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';
                const params = [data.username, data.password];
                db.run(sql, params, function(err) {
                    if (err) {
                        console.error("Error executing SQL query: ", err.message);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: err.message }));
                        return;
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'User added successfully', id: this.lastID }));
                });
            } catch (err) {
                console.error("Error parsing request body: ", err.message);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

// Start the server
server.listen(3000, (err) => {
    if (err) {
        console.error("Error starting the server: ", err.message);
    } else {
        console.log('Server is listening on port 3000');
    }
});