import {pool} from '../index.js';

export const userAlreadyAnswered = (username, surveyid) =>  
    pool.query('SELECT COUNT(*) AS user_already_answered FROM user_has_voted_for WHERE user_name = ? AND survey = ?', [username, surveyid])
.then((result) => {
    //Gibt true zurück wenn User diese Umfrage schon beantwortet hat
    return result[0][0].user_already_answered >= 1;
})
.catch((err) => {
    return err;
})


export const surveyEnded = (surveyid) => 
    pool.query('SELECT *, IF(end_at < CURRENT_TIMESTAMP, true, false) AS surveyended FROM surveys WHERE id= ? ', [surveyid])
.then((result) => {
    //Gibt true zurück wenn diese Umfrage schon zu Ende ist
    return result[0][0].surveyended === 1;
})
.catch((err) => {
    return err;
})


export const submitAnswer = (username, answerid, surveyid) => 
    pool.query('INSERT INTO user_has_voted_for (user_name, answer_id, survey) VALUES (?, ?, ?)', [username, answerid, surveyid])
.then((result) => {
    return result;
})
.catch((err) => {
    return err;
})