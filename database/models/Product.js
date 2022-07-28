module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        category: {
            type: dataTypes.STRING
        },
        stock: {
            type: dataTypes.INTEGER
        },
        typeProductId: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'products',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)
    
    return Product
}
