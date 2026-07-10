const sequelize = require('../config/database')
const Arbitre = require('./arbitre.model') (sequelize)
const Match = require('./match.model') (sequelize)
const Affectation = require('./affectation.model') (sequelize)
const User = require('./user.model')

Arbitre.belongsToMany(Match, {
    through: Affectation,
    foreignKey: 'arbitreId',
    otherKey: 'matchId',
    as: 'match'

})

Match.belongsToMany(Arbitre, {
    through: Affectation,
    foreignKey: 'matchId',
    otherKey: 'arbitreId',
    as: 'arbitres'
})


Affectation.belongsTo(Arbitre, { foreignKey: 'arbitreId', as: 'arbitre'})
Affectation.belongsTo(Match, { foreignKey: 'matchId' , as: 'match'})
Arbitre.hasMany(Affectation, { foreignKey: 'arbitreId' , as: 'affectations'})
Match.hasMany(Affectation , { foreignKey: 'matchId' , as: 'affectations'})

module.exports = { sequelize , Arbitre , Match , Affectation, User}