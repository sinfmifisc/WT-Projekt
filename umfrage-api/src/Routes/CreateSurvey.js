function initCreateSurveyRoute(expressApp, pool){

    //holt sich user aus Datenbank und gibt sie zurück
    expressApp.get('/alluser', (req, res) => {
        pool.query('SELECT user_name FROM users')
        .then((result) => {
            console.log(result[0]);
            res.json(result[0]);
        })
        .catch((err) => {console.log(err);})
    }) 

}

module.exports = initCreateSurveyRoute;