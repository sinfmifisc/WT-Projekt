import jwt from 'jsonwebtoken';
import { getSurveyEvaluation, getAnswers, checkRight, getSurvey } from '../Models/LoadSingleSurveyModel.js';

exports.loadSurvey = (req, res) => {
    const survey = req.params.id;

    jwt.verify(req.headers.authorization, 'secret', (err, decoded) => {
  
    const user = decoded.user;
  
    checkRight(user, survey)
      .then((result) => {
      
          if(result){

            getSurvey(survey)
            .then((result) => {
              res.json(result[0]);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            })
          }
          else{
            res.json({error: 'notallowed'});
          }

        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500)})
    })
}


exports.loadAnswers = (req,res) => {
    const survey = req.params.id;

    getAnswers(survey)
    .then((result) => {
        res.json(result[0]);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
}


exports.loadSurveyEvaluation = (req, res) => {
    const survey = req.params.id;

    getSurveyEvaluation(survey)
    .then((result) => {
        res.json(result[0]);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
}