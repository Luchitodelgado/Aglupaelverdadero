module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        password: {
            type: dataTypes.STRING
        },
        firstName: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        birthday: {
            type: dataTypes.DATE
        },
        avatar: {
            type: dataTypes.STRING
        },
        typeUserId: {
            type: dataTypes.INTEGER
        },
        email: {
            type: dataTypes.STRING
        },
         phone: {
            type: dataTypes.INTEGER
        } 
    }
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config)

    User.associate = function(models) {
        User.belongsTo(models.Typeuser, {
            as: "typeUsers",
            foreignKey: "typeUserId"
        })
    }


    return User
}
