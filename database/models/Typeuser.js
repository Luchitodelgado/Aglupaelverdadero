module.exports = (sequelize, dataTypes) => {
    let alias = 'Typeuser';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
    }
    let config = {
        tableName: 'typeusers',
        timestamps: false
    };
    const Typeusers = sequelize.define(alias, cols, config)

    Typeusers.associate = function (models) {
        Typeusers.hasMany(models.User, {
            as: "users",
            foreignKey: "typeUserId"
        })
    }

    return Typeusers
}
