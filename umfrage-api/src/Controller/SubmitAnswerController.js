import { userAlreadyAnswered, surveyEnded, submitAnswer } from '../Models/SubmitAnswerModel.js';

exports.submitAnswer = (req, res, next) => {
        
    const answerid = req.body.answerid;
    const surveyid = req.body.surveyid;
    const username = req.body.username;
    
    //Teste ob User die Umfrage schon beantwortet hat
    userAlreadyAnswered(username, surveyid)
    .then((result) => {
       
        if(result){
            res.json({error: 'doubleanswer'});
        }

        else {
            //Test ob diese Umfrage schon abgelaufen ist
            surveyEnded(surveyid)
            .then((result) => {
            
                if(result){
                    res.json({error: 'surveyended'});
                }
                else {
                    //Umfrage ist noch aktiv und User hat noch nicht geantwortet
                    submitAnswer(username, answerid, surveyid)
                    .then((result) => {
                        res.sendStatus(201);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(500);
                    })
                }
                
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })

    
}