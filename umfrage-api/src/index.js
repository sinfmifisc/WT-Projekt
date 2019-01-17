import express from 'express';
import path from 'path';
import fs from 'fs';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import initCreateSurveyRoute from './Routes/CreateSurvey.js' ;
import initLoadSurveysRoute from './Routes/LoadSurveys.js';
import initLoginRoute from './Routes/Login.js';
import initLoadSingleSurveyRoute from './Routes/LoadSingleSurvey';
import initUnauthorizedRoute from './Routes/Unauthorized';
import initSubmitAnswerRoute from './Routes/SubmitAnswer';
import https from 'https';
import http from 'http';

const app = express();
const host = 'localhost';



const authChecker = (req, res, next) => {

	//TODO: Checken ob User eingeloggt ist
    if (req.path ==='/api/auth' || req.path === '/unauthorized') {
		
        next();
    } else {
	   res.redirect('/unauthorized');
	   
    }
}

//Wegen Entwicklungszwecken auskommentiert:
//app.use(authChecker)


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
	

	app.use((req, res, next) => {
	
    	if (req.secure) {
			
        	next();
    	} else {
			console.log('http Anfrage auf https umgeleitet');
			res.redirect('https://localhost:8443' + req.url);
			
    	}
	});


app.use(express.json());
//app.use(bodyParser.urlencoded());

initLoginRoute(app,pool);
initCreateSurveyRoute(app, pool);
initLoadSurveysRoute(app,pool);
initLoadSingleSurveyRoute(app, pool);
initUnauthorizedRoute(app);
initSubmitAnswerRoute(app, pool);

	

  https.createServer({
	key: fs.readFileSync('sslCertificates/server.key'),
	cert: fs.readFileSync('sslCertificates/server.cert')
  }, app)
  .listen(8443,  () => {
	console.log('https Server listen on port 8443');
  })


  http.createServer(app).listen(8080, () => {
	console.log('https Server listen on port 8080');
  })
  
  


app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})


