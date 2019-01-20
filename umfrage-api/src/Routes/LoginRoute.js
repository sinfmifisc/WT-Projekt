import loginController from '../Controller/LoginController';

const initLoginRoute = (app) => {

    //Benutzername und Passwort vom Login verarbeiten
    app.post('/api/auth', loginController.login)

}

module.exports = initLoginRoute;