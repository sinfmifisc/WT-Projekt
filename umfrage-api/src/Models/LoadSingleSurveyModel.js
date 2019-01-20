import {pool} from '../index.js';

export const getSurveyEvaluation = (survey) => pool.query(`SELECT * FROM
    ( SELECT answer_id, survey, COUNT(*) AS count
    FROM user_has_voted_for
    WHERE survey = ? GROUP BY answer_id) AS evaluation
    LEFT JOIN (
    SELECT content as content, id as answer_id
    FROM answers WHERE survey_id = ? )
    AS allanswers on evaluation.answer_id = allanswers.answer_id`, [survey, survey])
.then((result) => {
    return result;
})
.catch(err => {
    return err;
})


export const getAnswers = (survey) =>  pool.query('SELECT * FROM answers WHERE survey_id=?', [survey])
.then((result) => {
    return result;
})
.catch(err => {
    return err;
})


export const checkRight = (user, survey) => pool.query(`SELECT COUNT(*) AS allowed FROM user_is_allowed_to_vote_for 
    WHERE user_name = ? AND survey = ? 
    UNION SELECT COUNT(*) AS allowed From surveys 
    WHERE creator = ? AND id = ?`, [user, survey, user, survey])
.then((result) => {
    //Gibt true zurück wenn dieser User erlaubt ist diese Umfrage zu sehen/beantworten
    return (result[0][0].allowed === 1 || result[0][1]);
})
.catch((err) => {
    return err;
})


export const getSurvey = (survey) => pool.query('SELECT * FROM surveys WHERE id=?', [survey])
.then((result) => {
    return result;
})
.catch((err) => {
    return err;
})
