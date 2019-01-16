const initSubmitAnswerRoute = (app, pool) => {

    app.post('/submitanswer', (req, res) => {
    
        let answerid = req.body.answerid;
        let surveyid = req.body.surveyid;
        let username = req.body.username;
        console.log(username);
        pool.query('SELECT COUNT(*) AS user_already_answered FROM user_has_voted_for WHERE user_name = ? AND survey = ?', [username, surveyid])
        .then((result) => {
            
            if(result[0][0].user_already_answered >= 1){
                res.json({error: 'doubleanswer'});
            }
            else {
                pool.query('SELECT *, IF(end_at < CURRENT_TIMESTAMP, true, false) AS surveyended FROM surveys WHERE id= ? ', [surveyid])
                .then((result) => {
                    console.log(result[0][0].surveyended);
                    if(result[0][0].surveyended === 1)
                        res.json({error: 'surveyended'});
                })

                pool.query('INSERT INTO user_has_voted_for (user_name, answer_id, survey) VALUES (?, ?, ?)', [username, answerid, surveyid])
                .then((result) => {
                    res.sendStatus(201);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                })
            }
        })

        
    })

   


}

module.exports = initSubmitAnswerRoute;