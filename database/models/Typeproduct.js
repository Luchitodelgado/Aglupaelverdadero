module.exports = (sequelize, dataTypes) => {
    let alias = 'Typeproduct';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: dataTypes.INTEGER
        },
    }
    let config = {
        tableName: 'typeproducts',
        timestamps: false
    };
    const Typeproduct = sequelize.define(alias, cols, config)

    Typeproduct.associate = function(models) {
        Typeproduct.belongsToMany(models.Product, {
            as: "products",
            through: "typeProduct_products",
            foreignKey: "typeProductId",
        /*     otherKey: "movie_id", */
            timestamps: false
        }) 
    }

    return Typeproduct
}
