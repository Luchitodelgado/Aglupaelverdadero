function guestMiddleware(req, res, next) {
    if (req.session.userLogged == undefined) {
        usuario = req.session.userLogged;
        res.locals.userLogged = req.session.userLogged;
        res.redirect('/ingresa');
    }
    next();
};
module.exports = guestMiddleware;