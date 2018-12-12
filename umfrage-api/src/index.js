import express from 'express';
import path from 'path';

const app = express();


const mysql = require('mysql2/promise');
const host = "localhost";


let db  // will be set below!
mysql.createConnection({
		host: host,
		user: 'root',
		password: '',
		database: 'test'
		
	})
	.then((connection) => {
		db = connection  // remember the db-handle!
		return db.query('CREATE TABLE students (id varchar(10) not null, name varchar(20), primary key (id))')
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
