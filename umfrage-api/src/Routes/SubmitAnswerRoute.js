import submitAnswerController from '../Controller/SubmitAnswerController'

const initSubmitAnswerRoute = (app) => {

    //Abgesendete Antworten verarbeiten
    app.post('/submitanswer', submitAnswerController.submitAnswer);

   
}

module.exports = initSubmitAnswerRoute;