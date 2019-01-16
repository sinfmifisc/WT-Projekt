const initLoadSurveysRoute = (app, pool) => {

    

    app.get('/loadopensurveys/:username/:param', (req, res) => {
        let user = req.params.username;
        let param = req.params.param;
        
        if(param === 'all'){
            pool.query(`SELECT distinct id, matter, created_at, end_at, creator, IF(user_has_voted_for.user_name IS NULL, 'false', 'true') AS answered, 
                counted_answers.count
                FROM surveys LEFT JOIN user_has_voted_for ON surveys.id = user_has_voted_for.survey
                LEFT JOIN (SELECT survey, COUNT(*) AS count FROM user_has_voted_for GROUP BY survey) AS counted_answers ON surveys.id = counted_answers.survey
                LEFT JOIN user_is_allowed_to_vote_for ON surveys.id = user_is_allowed_to_vote_for.survey
                WHERE user_is_allowed_to_vote_for.user_name=? AND end_at > CURRENT_TIMESTAMP`, [user])
            .then((result) => {
                res.json(result[0]);
            })
            .catch((err) => console.log(err))
        }

        else if(param === 'own'){
            pool.query(`SELECT distinct id, matter, created_at, end_at, creator, IF(user_has_voted_for.user_name IS NULL, 'false', 'true') AS answered, 
            IF((SELECT COUNT(*) AS test FROM user_is_allowed_to_vote_for WHERE user_name = ? AND survey = id) = 0, 'false', 'true') AS allowed_to_vote, 
                counted_answers.count
                FROM surveys LEFT JOIN user_has_voted_for ON surveys.id = user_has_voted_for.survey
                LEFT JOIN (SELECT survey, COUNT(*) AS count FROM user_has_voted_for GROUP BY survey) AS counted_answers ON surveys.id = counted_answers.survey
                WHERE creator=? AND end_at > CURRENT_TIMESTAMP`, [user, user])
                .then((result) => {
                    res.json(result[0]);
                })    
                .catch((err) => console.log(err))
        }
        

        else {
            res.sendStatus(404);
        }
    });

    
    app.get('/loadclosedsurveys/:username/:param', (req, res) =>{
        let user = req.params.username;
        let param = req.params.param;
        
        if(param === 'all'){
            pool.query(`SELECT distinct id, matter, created_at, end_at, creator, IF(user_has_voted_for.user_name IS NULL, 'false', 'true') AS answered, 
            counted_answers.count
            FROM surveys LEFT JOIN user_has_voted_for ON surveys.id = user_has_voted_for.survey
            LEFT JOIN (SELECT survey, COUNT(*) AS count FROM user_has_voted_for GROUP BY survey) AS counted_answers ON surveys.id = counted_answers.survey
            LEFT JOIN user_is_allowed_to_vote_for ON surveys.id = user_is_allowed_to_vote_for.survey
            WHERE user_is_allowed_to_vote_for.user_name=? AND end_at <= CURRENT_TIMESTAMP`, [user, user])
            .then((result) => {
                res.json(result[0]);
            })
            .catch((err) => console.log(err))
        }

        else if(param === 'own'){
            pool.query(`SELECT distinct id, matter, created_at, end_at, creator, IF(user_has_voted_for.user_name IS NULL, 'false', 'true') AS answered, 
            IF((SELECT COUNT(*) AS test FROM user_is_allowed_to_vote_for WHERE user_name = ? AND survey = id) = 0, 'false', 'true') AS allowed_to_vote, 
                counted_answers.count
                FROM surveys LEFT JOIN user_has_voted_for ON surveys.id = user_has_voted_for.survey
                LEFT JOIN (SELECT survey, COUNT(*) AS count FROM user_has_voted_for GROUP BY survey) AS counted_answers ON surveys.id = counted_answers.survey
                WHERE creator=? AND end_at <= CURRENT_TIMESTAMP`, [user, user])
                .then((result) => {
                    res.json(result[0]);
                })
                .catch((err) => console.log(err))
            
        }
    
        else {
            res.sendStatus(404);
        }
    
    });
    

}

module.exports = initLoadSurveysRoute;