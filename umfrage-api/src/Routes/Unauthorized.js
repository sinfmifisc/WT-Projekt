const initUnauthorizedRoute = (app) => {

    app.all('/unauthorized', (req, res) => {
        res.sendStatus(403);
        
    });

    
}

module.exports = initUnauthorizedRoute;