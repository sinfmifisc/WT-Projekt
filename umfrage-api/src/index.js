import express from 'express';
import path from 'path';
import fs from 'fs';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const app = express();
const host = 'localhost';

//read SQL instructions for creating the tables
let databaseTableCreating = fs.readFileSync('databasecreatetables.txt').toString();

//read SQL instructions for filling up data
let databaseCreateTestUsers = fs.readFileSync('databasecreatetestusers.txt').toString();


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
	
	function jwt_set(token){localStorage.setItem('jwt', token);}

console.log('########..##');
app.use(express.json());
app.listen(8080, () => console.log("Running on lokalhost: 8080"));

app.post("/api/auth", (req, res) => {
	let password = req.body.credentials.password;
	let username = req.body.credentials.username;
	let respond = res;


	pool.query('SELECT * FROM users WHERE user_name = ?', [username])
	.then((result) => {
		bcrypt.compare(password, result[0][0].password_hash)
		.then(function(res) {
			if(res == true){
				console.log('Passwort ist korrekt');
				let token = jwt.sign( { user: username },'secret');
				respond.json({ user: {username: result[0][0].user_name, token: token } }); 
			}
			else if (res == false){
				console.log('ERROR falsches Passwort!');
				respond.status(400).json({errors: {global: "Invalid credentials"} });
			}
		})
		.catch((err) => {
			console.log(err);
		})
	})
	.catch((err) => {
		console.log('User existiert nicht');
		console.log(err);
		respond.status(400).json({errors: {global: "Invalid credentials"} });
	})
});


app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

