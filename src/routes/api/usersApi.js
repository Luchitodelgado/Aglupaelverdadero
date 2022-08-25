const { genSaltSync } = require('bcryptjs');
const express = require('express');
const { addListener } = require('nodemon');
const router = express.Router();
const db = require("../../../database/models")
const sequelize = db.sequelize;
const Users = db.User;


router.get('/api/users', (req, res) => {
    Users.findAll({
    }).then(function (usuarios) {
        let resArray = usuarios.map((user) => {
            return user.dataValues;
        })
        resArray.forEach((user) => {
            delete user.password,
                delete user.phone,
                delete user.birthday,
                delete user.avatar,
                delete user.typeUserId,
                /* delete user.lastName, */
                user.detail = 'http://localhost:3001/api/users/' + user.id
        })
        return res.status(200).json({
            count: usuarios.length,
            users: resArray,
            status: 200
        })
    })
})
router.get('/api/users/:id', (req, res) => {
    id = req.params.id
    Users.findAll({
        where: { id: id }
    }).then(function (usuarios) {
        let resArray = usuarios.map((user) => {
            return user.dataValues;
        })
        resArray.forEach((user) => {
            delete user.password,
                delete user.phone,
                delete user.typeUserId,                
                user.avatar = 'http://localhost:3001/img/img-usuarios/' + user.avatar 
        })
        return res.status(200).json({        
            users: resArray,
            status: 200
        })
    })
})
 
module.exports = router;
