import {allOpenSurveys, ownOpenSurveys, allClosedSurveys, ownClosedSurveys} from '../Models/LoadSurveysModel';

exports.loadOpenSurveys = (req, res) => {
        const user = req.params.username;
        const param = req.params.param;
        
        if(param === 'all'){
            allOpenSurveys(user)
            .then((result) => {
                res.json(result[0]);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
        }

        else if(param === 'own'){
            ownOpenSurveys(user)
                .then((result) => {
                    res.json(result[0]);
                })    
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                })
        }
        
        else {
            res.sendStatus(404);
        }
    }



exports.loadClosedSurveys = (req, res) =>{
        const user = req.params.username;
        const param = req.params.param;
        
        if(param === 'all'){
            allClosedSurveys(user)
            .then((result) => {
                res.json(result[0]);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
        }

        else if(param === 'own'){
            ownClosedSurveys(user)
                .then((result) => {
                    res.json(result[0]);
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(500);
                })
            
        }
    
        else {
            res.sendStatus(404);
        }
    
    }