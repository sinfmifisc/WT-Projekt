import { getAllUser, insertSurvey, insertUserAllowedToVote, insertAnswers } from '../Models/CreateSurveyModel.js';


exports.allUser = (req, res) => {
    getAllUser()
    .then((result) => {
        res.json(result[0]);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
}


exports.createSurvey = (req, res) => {
       
    const survey = req.body.surveydata.surveycreation;
    const user = req.body.userinfo;
     
    insertSurvey(survey.surveymatter, survey.duration, user)
    .then((result) => {

        //Insertid holen, dann Antworten und ausgewählte User abspeichern
        const surveyId = result;

        insertUserAllowedToVote(survey.allowedUser, surveyId)
        .then((result) => {
            
            insertAnswers(survey.answers, surveyId)
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
        })
        .catch((err) =>{
            console.log(err);
            res.sendStatus(500);
        })           
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
    
}