const express = require ('express')
const router = express.Router()

    const authController = require('../controllers/auth.controller')
    const authenticate = require('../middlewares/authenticate.middleware')
    const authorize = require('../middlewares/authorize.middleware')

    router.post('/register', authenticate, authorize('admin'), authController.register)
    router.post('/login', authController.login)
    router.get('/me', authenticate, authController.me)

    module.exports= router
