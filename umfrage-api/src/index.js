import express from 'express';
import mysql from 'mysql2/promise';
import initCreateSurveyRoute from './Routes/CreateSurveyRoute.js' ;
import initLoadSurveysRoute from './Routes/LoadSurveysRoute.js';
import initLoginRoute from './Routes/LoginRoute.js';
import initLoadSingleSurveyRoute from './Routes/LoadSingleSurveyRoute';
import initUnauthorizedRoute from './Routes/UnauthorizedRoute';
import initSubmitAnswerRoute from './Routes/SubmitAnswerRoute';
import https from 'https';
import http from 'http';
import cors from 'cors';
import fs from 'fs';
import {redirecter, authChecker} from './Middleware.js';
import { initDatabase } from './InitDatabase.js';

const app = express();
//Wenn Datenbank auf Docker läuft = 192.168.99.100
//Über Xampp oder ähnliches = localhost
const host = '192.168.99.100';


//Baue Datenbankpool auf
export const pool = mysql.createPool({
	host: host,
	user: 'root',
	password: 'my-secret-pw',
	database: 'mydb',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	multipleStatements: true
});
	
//Erstelle Tabellen und Fülle Testuser auf wenn Sie noch nicht existieren
initDatabase(pool, fs);


		
//Enable cors, da proxy im production mode nicht funktioniert
app.use(cors());
app.options('*', cors())

//Leite http Anfragen auf https um
app.use(redirecter)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authChecker)


//Initialisiere alle Routen
initLoginRoute(app);
initCreateSurveyRoute(app);
initLoadSurveysRoute(app);
initLoadSingleSurveyRoute(app);
initUnauthorizedRoute(app);
initSubmitAnswerRoute(app);

	

https.createServer({
	key: fs.readFileSync('Encryption/server.key'),
	cert: fs.readFileSync('Encryption/server.cert')
}, app)
.listen(8443,  () => {
	console.log('https Server listen on port 8443');
})


http.createServer(app).listen(8080, () => {
	console.log('http Server listen on port 8080');
})
  
  


