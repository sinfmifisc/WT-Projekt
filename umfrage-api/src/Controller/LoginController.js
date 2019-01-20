import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { existsUser, getHashedPassword } from '../Models/LoginModel.js';


exports.login  = (req, res, next) => {
    const password = req.body.credentials.password;
    const username = req.body.credentials.username;
    
    
    //Testen ob User überhaupt existiert
    existsUser(username)
    .then((result) => {
        if(result){
            
            //Gehashte Passwort aus Datenbank laden
            getHashedPassword(username)	
            .then((result) => {				
                
                //Checken ob User das richtige Passwort eingegeben hat
                bcrypt.compare(password, result)
                .then((erg) => {

                    if(erg == true){
                        console.log('Passwort ist korrekt');
                        const token = jwt.sign( { user: username },'secret', {expiresIn: '24h'});
                        
                        res.json({ user: {username: username, token: token } }); 
                    }
                    else if(erg == false){
                        console.log('Falsches Passwort!');
                        res.status(400).json({errors: {global: "Ungültige Eingabe"} });
                    }		
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                })
            })
            .catch((err) => {	
                console.log(err);		
                res.sendStatus(500);
            })	
        }
        else{
            console.log('User existiert nicht');
            res.status(400).json({errors: {global: "Ungültige Eingabe"} });
        }
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })

}