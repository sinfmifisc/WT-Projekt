import express from 'express';
import path from 'path';
import fs from 'fs';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const app = express();
const host = 'localhost';





//read SQL instructions for creating the tables

let databaseTableCreating = fs.readFileSync('databasecreatetables.txt').toString();

//read SQL instructions for filling up data
let databaseCreateTestUsers = fs.readFileSync('databasecreatetestusers.txt').toString();


/*
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

*/

	const pool = mysql.createPool({
		host: host,
		user: 'root',
		password: '',
		database: 'test',
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
		multipleStatements: true
	  });
	
	
	pool.query(databaseTableCreating) 
	
	 .then((result) => {
		 console.log(result);
		 console.log('Database and table created');
	 })
	
	.then(() => {
	pool.query(databaseCreateTestUsers)
	})
	.then((result) => {
		console.log(result);
		console.log('Testuser created');
	})
	.catch((err) => {
		console.log(err);
	});
	
	

//Example function to check password
pool.query('SELECT * FROM users WHERE user_name = "klaus"') 
	.then((result) => {
		console.log(result[0][0].user_name);
		
		bcrypt.compare('0000', result[0][0].password_hash)
		.then(function(res) {
			if(res == true){
				console.log('Passwort ist korrekt');
			}
			else if(res == false){
				console.log('ERROR falsches Passwort!');
			}
		
		})
	});



app.post("/api/auth", (req, res) => {
	res.status(400).json({ errors: { global: "Invalid credentials"} });
});

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(1234, () => console.log("Running on lokalhost: 1234"))
