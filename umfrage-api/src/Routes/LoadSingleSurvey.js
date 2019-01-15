const initLoadSingleSurveyRoute = (app, pool) => {

    app.get('/loadsurvey/:id', (req, res) => {
        let survey = req.params.id;

        pool.query('SELECT * FROM surveys WHERE id=?', [survey])
        .then((result) => {
            res.json(result[0]);
        })
        .catch(err => console.log(err))

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

        pool.query('SELECT answer_id, survey, COUNT(*) AS count FROM user_has_voted_for WHERE survey=? GROUP BY answer_id', [survey])
        .then((result) => {
            res.json(result[0]);
        })
        .catch(err => console.log(err))
    })



}

module.exports = initLoadSingleSurveyRoute;