import {pool} from '../index.js'

export const getAllUser = () => pool.query('SELECT user_name FROM users')
.then((result) => {
    return result;
})
.catch((err) => {
    return err;
})


export const insertSurvey = (matter, duration, creator) => 
    pool.query('INSERT INTO surveys (matter, end_at, number_of_answers, creator) VALUES ( ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? HOUR) , 1, ?)', 
[matter, duration, creator])
.then((result) => {
    //Gib die insertId zurück
    return result[0].insertId;
})
.catch((err) => {
    return err;
})




export const insertUserAllowedToVote = (allowedUser, surveyId) => pool.query(userAllowedToVoteQuery(allowedUser, surveyId))
.then((result) => {
    return result;
})
.catch((err) => {
    return err;
})



export const insertAnswers = (answers, surveyId) => pool.query(answersQuery(answers, surveyId))
.then((result) => {
    return result;
})
.catch((err) => {
    return err;
})



//Hilfsfunktionen zum SQL Statement zusammenbauen
const userAllowedToVoteQuery = (allowedUser, surveyId) => {
    //SQL Statement für erlaubte User zusammenbauen
    let queryString = 'INSERT INTO user_is_allowed_to_vote_for (user_name, survey) VALUES ';
    let i = 0;
    for(; i < allowedUser.length - 1; i++){
        queryString = queryString + '(' + pool.escape(allowedUser[i]) + ', ' + pool.escape(surveyId) + '), ';
    }
    queryString =  queryString + '(' + pool.escape(allowedUser[i]) + ', ' + pool.escape(surveyId) + ')';
    
    return queryString;
}

const answersQuery = (answers, surveyId) => {
    //SQL Statement für Antworten zusammenbauen
    let i = 0;                
    let queryString = 'INSERT INTO answers (content, survey_id, id) VALUES '
    for(; i < answers.length - 1; i++){
        queryString = queryString + '(' + pool.escape(answers[i].content) + ', ' + pool.escape(surveyId) + ', ' + pool.escape(answers[i].id) + '), ';
    }
    queryString = queryString + '(' + pool.escape(answers[i].content) + ', ' + pool.escape(surveyId) + ', ' + pool.escape(answers[i].id) + ')'
    return queryString;
}