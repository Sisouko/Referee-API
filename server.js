require('dotenv').config()
const express = require('express')
const { sequelize } = require('./models')

const logger = require('./middlewares/logger.middleware')
const errorHandler = require('./middlewares/error.middleware')

const arbitreRoutes = require('./')
const matchRoutes = require('')
const affectationRoutes = require('')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/arbitres', arbitreRoutes)
app.use('/matches', matchRoutes)
app.use('/affectations', affectationRoutes)

app.get('/', (req, res) => {
    res.send({
        message: 'FIFA world Cup 2026 - Referee Management API',
        version: '1.0.0',
        endpoint: {
            arbitres: '/arbitres',
            matches: '/matches',
            affectations: '/affectations',
            stats: '/affectations/stats/total'
        }
    })
})

app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
})

app.use(errorHandler)

sequelize
    .authenticate()
    .then(() =>{
        console.log('PostgresSQL connection has been established successfully.')
        return sequelize.sync({ alter: true })
    })
    .then(() => {
        console.log('Database synchronized successfully.')
        app.listen(PORT, () => {
            console.log('Server is running on http://localhost:${PORT}')
        })
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err.message)
        process.exit(1)
    })