const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
    const Arbitre = sequelize.define('Arbitre', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nationalite: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confederation: {
            type: DataTypes.ENUM('UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'),
            allowNull: false
        },
        categorie: {
            type: DataTypes.ENUM('central', 'assistant' , 'VAR', 'AVAR', '4e'),
            allowNull: false
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate : {
                min: 0
            }
        },
        statut: {
            type: DataTypes.ENUM('actif' , 'suspendu' , 'blesse', 'retraite'),
            defaultValue: 'actif'
        }
    }, {
        tableName: 'arbitres',
        timestamps: false
    })
    return Arbitre
}