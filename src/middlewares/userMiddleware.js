function userMiddleware(req, res, next) {
    res.locals.isLogged=false
    console.log('asddas')
    if (req.session.userLogged) {
        usuario = req.session.userLogged;
        res.locals.userLogged = req.session.userLogged;
/*         res.redirect('/perfil') */

    }
    next();
};
module.exports = userMiddleware;