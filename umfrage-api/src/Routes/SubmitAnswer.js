const initSubmitAnswerRoute = (app, pool) => {

    app.post('/submitanswer', (req, res) => {
        let answer = req.body;
        console.log(answer)
        res.sendStatus(201);
    })

   


}

module.exports = initSubmitAnswerRoute;