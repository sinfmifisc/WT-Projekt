import unauthorizedController from '../Controller/UnauthorizedController'

const initUnauthorizedRoute = (app) => {

    //Hier wird man hingeleitet wenn man ohne sich zu authentifizieren eine bestimmte URL aufruft
    app.all('/unauthorized', unauthorizedController.unauthorized);

    
}

module.exports = initUnauthorizedRoute;