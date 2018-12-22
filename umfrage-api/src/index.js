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
	




app.use(express.json());
app.listen(1234, () => console.log("Running on lokalhost: 1234"));

app.post("/api/auth", (req, res) => {
	let password = req.body.credentials.password;
	let username = req.body.credentials.username;
	let respond = res;

	//Testen ob User überhaupt existiert
	pool.query('SELECT COUNT(*) AS user_exists FROM users WHERE user_name = ?', [username])
	.then((result) => {
		if(result[0][0].user_exists === 1){
			
			//Gehashte Passwort aus Datenbank laden
			pool.query('SELECT * FROM users WHERE user_name = ?', [username])	
			.then((result) => {				
				
				//Checken ob User das richtige Passwort eingegeben hat
				bcrypt.compare(password, result[0][0].password_hash)
				.then(function(res) {

					if(res == true){
					console.log('Passwort ist korrekt');
						//TODO Webtoken setzen und weiterleiten an den umfrage>seite
						respond.status(400).json({ errors: { global: 'korrektes Passwort'} });
					}
					else if(res == false){
						console.log('Falsches Passwort!');
						respond.status(400).json({errors: {global: "Invalid credentials"} });
					}		
				})
				.catch((err) => {
					console.log(err);
				})
			})
			.catch((err) => {	
				console.log(err);		
			})	
		}
		else{
			console.log('User existiert nicht');
			respond.status(400).json({errors: {global: "Invalid credentials"} });
		}
	})
	.catch((err) => {console.log(err);})

	
});


app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})




				