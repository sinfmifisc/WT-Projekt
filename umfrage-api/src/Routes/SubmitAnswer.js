const initSubmitAnswerRoute = (app, pool) => {

    app.post('/submitanswer', (req, res) => {
    
        let answerid = req.body.answerid;
        let surveyid = req.body.surveyid;
        let username = req.body.username;
        console.log(username);
        pool.query('INSERT INTO user_has_voted_for (user_name, answer_id, survey) VALUES (?, ?, ?)', [username, answerid, surveyid])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    })

   


}

module.exports = initSubmitAnswerRoute;