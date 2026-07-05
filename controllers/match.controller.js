const { Match, Arbitre } = require('../models/index')

exports.getAllMatchs = async (req, res, next) => {
    try {
        const matches = await Match.findAll()
        res.status(200).json(matches)
    } catch (err) {
        next (err)
    }
}

exports.getMatchById = async (req, res, next) => {
    try {
        const {id} = req.params
        const match = await Match.findByPk(id)
        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }
        res.status(200).json(match)
    } catch (err) {
        next (err)
    }
}

exports.createMatch = async (req,  res, next) => {
    try {
        const newMatch = await Match.create(req.body)
        res.status(201).json(newMatch)
    } catch (err) {
        next (err)
    }
}

exports.updateMatch = async (req, res, next) => {
    try{
        const {id} = req.params
        const match = await Match.findByPk(id)
        if(!match) {
            return res.status(404).json({ error: 'Match not found'})
        }
        await match.update(req.body)
        res.status(200).json(match)
    } catch (err) {
        next (err)
    }
}

exports.deleteMatch = async (req, res, next) => {
    try{
        const {id} = req.params
        const match = await Match.findByPk(id)
        if(!match) {
            return res.status(404).json({ error: 'Match not found' })
        }
        await match.destroy()
        res.status(204).send
    } catch (err) {
        next (err)
    }
}

exports.getMatchArbitres = async (req, res, next) => {
    try {
        const {id} = req.params
        const match = await Match.findByPk(id, {
            include: [{
                model: Arbitre,
                as: 'arbitres',
                through: { attributes: ['role']},
            }]
        })
        if (!match) {
            return res.status(404).json({ error: 'Match not found' })
        }
        res.status(200).json(match)
    } catch (err) {
        next (err)
    }
}

exports.filterMatchs = async (req, res, next) => {
    try {
        const { phase, ville } = req.query
        const where = {}
        if (phase) where.phase = phase
        if (ville) where.villeHote = ville
        const matchs = await Match.findAll({where})
        res.status(200).json(matchs)
    } catch (err) {
        next (err)
    }
}