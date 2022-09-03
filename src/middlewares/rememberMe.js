function rememberMe(req, res, next) {

    next();

    if (req.cookies.recordame != undefined && req.session.userLogged == undefined) {
        User.findOne({
            where: {
                email: req.body.email,
            }
        })
            .then(function (usuario) {
                if(usuario.email == req.cookies.recordame){
                    req.session.userLogged = usuario
                    console.log(usuario)
                }

             
            })
    }
}
module.exports = rememberMe;
