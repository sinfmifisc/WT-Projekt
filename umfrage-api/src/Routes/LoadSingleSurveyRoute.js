import loadSingleSurveyController from '../Controller/LoadSingleSurveyController'

const initLoadSingleSurveyRoute = (app) => {

    //Eine einzelne Umfrage laden
    app.get('/loadsurvey/:id', loadSingleSurveyController.loadSurvey);
    //Die Antwortmöglichkeiten einer Umfrage laden
    app.get('/loadanswers/:id', loadSingleSurveyController.loadAnswers);
    //Die Auswertung einer Umfrage laden
    app.get('/surveyevaluation/:id', loadSingleSurveyController.loadSurveyEvaluation);

}

module.exports = initLoadSingleSurveyRoute;