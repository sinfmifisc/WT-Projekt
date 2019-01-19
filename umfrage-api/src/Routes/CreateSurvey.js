const initCreateSurveyRoute = (app, pool) => {

    //holt sich user aus Datenbank und gibt sie zurück
    app.get('/alluser', (req, res) => {
        pool.query('SELECT user_name FROM users')
        .then((result) => {
            console.log(result[0]);
            res.json(result[0]);
        })
        .catch((err) => console.log(err))
    })
    

    //Umfrage von Frontend empfangen, anschließend in Datenbank speichern
    app.post('/createsurvey', (req, res) => {
       
        let survey = req.body.surveydata.surveycreation;
        let user = req.body.userinfo;
        console.log(survey);
        
        pool.query('INSERT INTO surveys (matter, end_at, number_of_answers, creator) VALUES ( ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? HOUR) , 1, ?)', 
        [survey.surveymatter, survey.duration, user])

        .then((result) => {
            

            //Insertid holen, dann Antworten und ausgewählte User abspeichern
            let surveyId = result[0].insertId;


            //SQL Statement für erlaubte User zusammenbauen
            let queryString = 'INSERT INTO user_is_allowed_to_vote_for (user_name, survey) VALUES ';
            let i = 0;
            for(; i < survey.allowedUser.length - 1; i++){
           
                queryString = queryString + '(' + pool.escape(survey.allowedUser[i]) + ', ' + pool.escape(surveyId) + '), ';
                
            }
            queryString =  queryString + '(' + pool.escape(survey.allowedUser[i]) + ', ' + pool.escape(surveyId) + ')';
            

            pool.query(queryString)
            .then((result) => {
                //SQL Statement für Antworten zusammenbauen
                let i = 0;                
                queryString = 'INSERT INTO answers (content, survey_id, id) VALUES '
                for(; i < survey.answers.length - 1; i++){
               
                    queryString = queryString + '(' + pool.escape(survey.answers[i].content) + ', ' + pool.escape(surveyId) + ', ' + pool.escape(survey.answers[i].id) + '), ';
                    
                }
                queryString = queryString + '(' + pool.escape(survey.answers[i].content) + ', ' + pool.escape(surveyId) + ', ' + pool.escape(survey.answers[i].id) + ')'


                pool.query(queryString)
                .then((result) => res.sendStatus(201))
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
        
    })
    
}

module.exports = initCreateSurveyRoute;