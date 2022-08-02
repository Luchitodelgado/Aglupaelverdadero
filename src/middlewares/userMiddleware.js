function userMiddleware(req, res, next) {
    res.locals.isLogged=false 
    if (req.session.userLogged) {
        usuario = req.session.userLogged;
        res.locals.userLogged = req.session.userLogged;
        res.locals.isLogged=true 
    }
    next();
};
module.exports = userMiddleware;