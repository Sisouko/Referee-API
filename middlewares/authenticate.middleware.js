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