import createSurveyController from '../Controller/CreateSurveyController';

const initCreateSurveyRoute = (app, pool) => {

    //Alle User aus Datenbank zurückgeben
    app.get('/alluser', createSurveyController.allUser);
    
    //Umfrage von Frontend empfangen, anschließend in Datenbank speichern
    app.post('/createsurvey', createSurveyController.createSurvey);
    
}

module.exports = initCreateSurveyRoute;