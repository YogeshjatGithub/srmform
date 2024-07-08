const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'college'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

app.post('/submit', (req, res) => {
    const { name, email, phone, department } = req.body;
    const sql = 'INSERT INTO employees (name, email, phone, department) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, department], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error inserting data');
        } else {
            res.send('Data inserted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
