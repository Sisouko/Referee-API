const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Match = sequelize.define('Match', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        equipeDomicile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        equipeExterieur: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        villeHote: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateMatch: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        phase: {
            type: DataTypes.ENUM('Groupes', '8e', '4e', 'demi', 'finale'),
            allowNull: false,
        },
    }, {
        tableName: 'matchs',
        timestamps: false,
    })

    return Match
}