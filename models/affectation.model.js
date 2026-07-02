const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Affectation = sequelize.define('Affectation', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        arbitreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'arbitres',
                key: 'id'
            }
        },
        matchId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'matchs',
                key: 'id'
        }
        },
        role: {
            type: DataTypes.ENUM('central', 'assistant', 'VAR', 'AVAR', '4e'),
            allowNull: false
        }
    }, {
        tableName: 'affectations',
        timestamps: false,
        indexes: [
            {
                fields: ['arbitreId'] 
            },
            {
                fields: ['matchId']
            },
            {
                unique: true,
                fields: ['arbitreId', 'matchId', 'role']
            }
        ]
    })
    return Affectation
}