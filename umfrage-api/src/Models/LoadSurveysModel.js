import {pool} from '../index.js';


export const allOpenSurveys = (user) => pool.query(`SELECT distinct id, matter,
    DATE_FORMAT(surveys.created_at,'%d.%m.%Y %H:%i') as created_at,
    DATE_FORMAT(surveys.end_at,'%d.%m.%Y %H:%i') as end_at,
    creator, 
    IF((SELECT COUNT(*) AS count FROM user_has_voted_for WHERE user_name = ? AND survey = surveys.id) = 1, 'true', 'false') AS answered, 
    counted_answers.count
    FROM surveys LEFT JOIN user_has_voted_for ON surveys.id = user_has_voted_for.survey
    LEFT JOIN (SELECT survey, COUNT(*) AS count FROM user_has_voted_for GROUP BY survey) AS counted_answers ON surveys.id = counted_answers.survey
    LEFT JOIN user_is_allowed_to_vote_for ON surveys.id = user_is_allowed_to_vote_for.survey
    WHERE user_is_allowed_to_vote_for.user_name=? AND end_at > CURRENT_TIMESTAMP ORDER BY end_at DESC` , [user, user])
.then((result) => {
    return result;
})
.catch((err) => {
    
    return err;
})


export const ownOpenSurveys = (user) => pool.query(`SELECT distinct id, matter, 
    DATE_FORMAT(surveys.created_at,'%d.%m.%Y %H:%i') AS created_at,
    DATE_FORMAT(surveys.end_at,'%d.%m.%Y %H:%i') AS end_at,
    creator,
    IF((SELECT COUNT(*) AS count FROM user_has_voted_for WHERE user_name = ? AND survey = surveys.id) = 1, 'true', 'false') AS answered, 
    IF((SELECT COUNT(*) AS test FROM user_is_allowed_to_vote_for WHERE user_name = ? AND survey = id) = 0, 'false', 'true') AS allowed_to_vote, 
    counted_answers.count
    FROM surveys LEFT JOIN user_has_voted_for ON surveys.id = user_has_voted_for.survey
    LEFT JOIN (SELECT survey, COUNT(*) AS count FROM user_has_voted_for GROUP BY survey) AS counted_answers ON surveys.id = counted_answers.survey
    WHERE creator=? AND end_at > CURRENT_TIMESTAMP ORDER BY end_at DESC`, [user, user, user])
.then((result) => {
    return result;
})    
.catch((err) => {
    
    return err;
})


export const allClosedSurveys = (user) => pool.query(`SELECT distinct id, matter, 
    DATE_FORMAT(surveys.created_at,'%d.%m.%Y %H:%i') AS created_at,
    DATE_FORMAT(surveys.end_at,'%d.%m.%Y %H:%i') AS end_at,
    creator,
    IF((SELECT COUNT(*) AS count FROM user_has_voted_for WHERE user_name = ? AND survey = surveys.id) = 1, 'true', 'false') AS answered, 
    counted_answers.count
    FROM surveys LEFT JOIN user_has_voted_for ON surveys.id = user_has_voted_for.survey
    LEFT JOIN (SELECT survey, COUNT(*) AS count FROM user_has_voted_for GROUP BY survey) AS counted_answers ON surveys.id = counted_answers.survey
    LEFT JOIN user_is_allowed_to_vote_for ON surveys.id = user_is_allowed_to_vote_for.survey
    WHERE user_is_allowed_to_vote_for.user_name=? AND end_at <= CURRENT_TIMESTAMP ORDER BY end_at DESC`, [user, user])
.then((result) => {
    return result;
})
.catch((err) => {
    return err;
})


export const ownClosedSurveys = (user) => pool.query(`SELECT distinct id, matter,
    DATE_FORMAT(surveys.created_at,'%d.%m.%Y %H:%i') AS created_at,
    DATE_FORMAT(surveys.end_at,'%d.%m.%Y %H:%i') AS end_at,
    creator,
    IF((SELECT COUNT(*) AS count FROM user_has_voted_for WHERE user_name = ? AND survey = surveys.id) = 1, 'true', 'false') AS answered, 
    IF((SELECT COUNT(*) AS test FROM user_is_allowed_to_vote_for WHERE user_name = ? AND survey = id) = 0, 'false', 'true') AS allowed_to_vote, 
    counted_answers.count
    FROM surveys LEFT JOIN user_has_voted_for ON surveys.id = user_has_voted_for.survey
    LEFT JOIN (SELECT survey, COUNT(*) AS count FROM user_has_voted_for GROUP BY survey) AS counted_answers ON surveys.id = counted_answers.survey
    WHERE creator=? AND end_at <= CURRENT_TIMESTAMP ORDER BY end_at DESC`, [user, user, user])
.then((result) => {
    return result;
})
.catch((err) => {
    return err;
})