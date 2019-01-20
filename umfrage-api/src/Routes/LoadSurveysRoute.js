import loadSurveysController from '../Controller/LoadSurveysController'

const initLoadSurveysRoute = (app, pool) => {

    //Umfragen die noch offen sind laden, je nach Parameter alle bei denen man teilnehmen darf oder nur welche die man erstellt hat
    app.get('/loadopensurveys/:username/:param', loadSurveysController.loadOpenSurveys);
    //Umfragen die schon ausgelaufen sind laden, je nach Parameter alle bei denen man teilnehmen darf oder nur welche die man erstellt hat
    app.get('/loadclosedsurveys/:username/:param', loadSurveysController.loadClosedSurveys);
    

}

module.exports = initLoadSurveysRoute;