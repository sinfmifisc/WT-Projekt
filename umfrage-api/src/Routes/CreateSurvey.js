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
        
        let survey = req.body.surveycreation;
        
        pool.query('INSERT INTO surveys (matter, end_at, number_of_answers, creator) VALUES ( ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? HOUR) , 1, "John")', 
        [survey.surveymatter, survey.duration])

        .then((result) => {
            console.log(result[0]);

            //Insertid holen, dann Antworten und ausgewählte User abspeichern
            let surveyId = result[0].insertId;
            survey.allowedUser.forEach(user => {
                pool.query('INSERT INTO user_is_allowed_to_vote_for (user_name, survey) VALUES (?, ?)', [user, surveyId])
                .then((result) => console.log(result[0]))
                .catch((err) => {console.log(err)
                    res.sendStatus(500);
                })
            });
            
            survey.answers.forEach(answer => {
                pool.query('INSERT INTO answers (content, survey_id, id) VALUES(?, ?, ?)', [answer.content, surveyId, answer.id])
                .then((result) => {console.log(result[0])
                    
                    })
                .catch((err) => {console.log(err)
                    res.sendStatus(500);
                })
                
            });

            //TODO: Status code 201 erst senden, wenn alle Anfragen erfolgreich ausgeführt wurden
            res.sendStatus(201);
        })
        .catch((err) => {console.log(err);
            res.sendStatus(500);
        })
        
    })
    
}

module.exports = initCreateSurveyRoute;