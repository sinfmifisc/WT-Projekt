import bcrypt from 'bcryptjs';

const initLoginRoute = (app, pool, jwt) => {

    app.post('/api/auth', (req, res) => {
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
                            let token = jwt.sign( { user: username },'secret', {expiresIn: '24h'});
                            
                            
                            respond.json({ user: {username: result[0][0].user_name, token: token } }); 
                        }
                        else if(res == false){
                            console.log('Falsches Passwort!');
                            respond.status(400).json({errors: {global: "Ungültige Eingabe"} });
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
                respond.status(400).json({errors: {global: "Ungültige Eingabe"} });
            }
        })
        .catch((err) => {console.log(err);})
    
    })

}

module.exports = initLoginRoute;