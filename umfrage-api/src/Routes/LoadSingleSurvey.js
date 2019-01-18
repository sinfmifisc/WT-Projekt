

const initLoadSingleSurveyRoute = (app, pool, jwt) => {



    

    
      


    app.get('/loadsurvey/:id', (req, res) => {
        let survey = req.params.id;

        jwt.verify(req.headers.authorization, 'secret', (err, decoded) => {
      
        let user = decoded.user;
      
        pool.query(`SELECT COUNT(*) AS allowed FROM user_is_allowed_to_vote_for WHERE user_name = ? AND survey = ? 
        UNION SELECT COUNT(*) AS allowed From surveys WHERE creator = ? AND id = ?`, [user, survey, user, survey])
          .then((result) => {
              if(result[0][0].allowed === 1 || result[0][1].allowed === 1){

                pool.query('SELECT * FROM surveys WHERE id=?', [survey])
                .then((result) => {
                  res.json(result[0]);
                })
                .catch(err => console.log(err))
              }
              else{
                res.json({error: 'notallowed'});
              }

            })

        })

        

    })

    app.get('/loadanswers/:id', (req,res) => {
        let survey = req.params.id;


        pool.query('SELECT * FROM answers WHERE survey_id=?', [survey])
        .then((result) => {
            res.json(result[0]);
        })
        .catch(err => console.log(err))
    })

    

    app.get('/surveyevaluation/:id', (req, res) => {
        let survey = req.params.id;

        pool.query(`SELECT * FROM
        ( SELECT answer_id, survey, COUNT(*) AS count
          FROM user_has_voted_for
          WHERE survey = ? GROUP BY answer_id) AS evaluation
        LEFT JOIN (
          SELECT content as content, id as answer_id
          FROM answers WHERE survey_id = ? )
         AS allanswers on evaluation.answer_id = allanswers.answer_id`, [survey, survey])
        .then((result) => {
            res.json(result[0]);
        })
        .catch(err => console.log(err))
    })



}

module.exports = initLoadSingleSurveyRoute;