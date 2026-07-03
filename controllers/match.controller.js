const { Match, Arbitre } = require('../models/index')

exports.getAllMatches = async (req, res, next) => {
    try { 
        const matches = await Match.finAll()
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