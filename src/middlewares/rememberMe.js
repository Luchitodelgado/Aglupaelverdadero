const db = require("../../database/models")
const sequelize = db.sequelize;
const User = db.User;

function rememberMe(req, res, next) {

    next();
    if (req.cookies.recordame != undefined && req.session.userLogged== undefined) {
        User.findOne({
            where: {
                email: req.cookies.recordame,
            }
        })
            .then(function (usuario) {
                req.session.userLogged = usuario;
                console.log(req.cookies.recordame)
          
            })
          
        
    }
}
module.exports = rememberMe;
