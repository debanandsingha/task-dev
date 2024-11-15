const sqlite3 = require('sqlite3').verbose();
const http = require('http');

// Connect to SQLite database
const db = new sqlite3.Database('./backend/db/database.db', sqlite3.OPEN_READWRITE, (err) => {
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
            const data = JSON.parse(body);
            const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
            const params = [data.username, data.password];
            db.run(sql, params, function(err) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User added successfully', id: this.lastID }));
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

//start server
server.listen(3000, (err) => {
    if (err) {
        console.error("Error starting the server: ", err.message);
    } else {
        console.log('Server is listening on port 3000');
    }
});