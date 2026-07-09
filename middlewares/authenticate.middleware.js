const jwt = require('jsonwebtoken')
const { Error } = require('sequelize')

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            Error: 'Token manquant. Ajoutez un header Authorization: Bearer <token>.'
        })
    }

    const parts = authHeader.split('')

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            Error: 'Format du token invalide. Attendu: Bearer <token>.'
        })
    }
    }


    const token = parts[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded 
        next ()
    } 
    
    catch (err){
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ Error: 'Token expiré. Reconnectez-vous.'})
        }
        return res.status(401).json({
            Error: 'Token invalide.'
        })
    }

    module.exports = authenticate