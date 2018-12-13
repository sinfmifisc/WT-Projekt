import express from 'express';
import path from 'path';

const app = express();

const fs = require('fs');
const mysql = require('mysql2/promise');
const host = 'localhost';


//read SQL instructions for creating the tables

let databaseTableCreating = fs.readFileSync('databasecreatetables.txt').toString();

//read SQL instructions for filling up data
let databaseCreateTestUsers = fs.readFileSync('databasecreatetestusers.txt').toString();



let db  // will be set below!
mysql.createConnection({
		host: host,
		user: 'root',
		password: '',
		database: 'test',

		
		multipleStatements: true
		
	})
	.then((connection) => {
		db = connection;  // remember the db-handle!
		db.query(databaseTableCreating);
		return db.query(databaseCreateTestUsers);
	})
	.then((result) => {
		console.log(result)
		console.log('Database and table created.')
	})
	.catch((err) => console.log(err));




app.post("/api/auth", (req, res) => {
	res.status(400).json({ errors: { global: "Invalid credentials"} });
});

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(1234, () => console.log("Running on lokalhost: 1234"))
