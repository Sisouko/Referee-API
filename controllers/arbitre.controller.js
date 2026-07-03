const { Arbitre, Match } = require('../models/index');

exports.getAllArbitres = async (req, res, next) => {
    try {
        const arbitres = await Arbitre.findAll({
            attributes: {exclude: [] }
        })
        res.status(200).json(arbitres);
    } catch (err){
        next(err);
    }
}


exports.getArbitreById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const arbitre = await Arbitre.findByPk(id)
        if(!arbitre) {
            return res.status(404).json({ error: 'Arbitre not found' });
        }
        res.status(200).json(arbitre);
    } catch (err) {
        next(err)
    }
} 

exports.createArbitre = async (req, res, next) => {
    try {
        const newArbitre = await Arbitre.create(req.body);
        res.status(201).json(newArbitre)
    } catch (err) {
        next(err)
    }
}


exports.updateArbitre = async (req, res, next) => {
    try {
        const {id} = req.params;
        const arbitre = await Arbitre.findByPk(id);
        if(!arbitre) {
            return res.status(404).json({ error: 'Arbitre not found' });
        }
        await arbitre.update(req.body)
        res.status(200).json(arbitre)
    } catch (err) {
        next(err)
    }
}

exports.deleteArbitre = async (req, res, next) => {
    try {
        const {id} = req.params
        const arbitre = await Arbitre.findByPk(id);
        if(!arbitre) {
            return res.status(404).json({ error: 'Arbitre not found' });
        }
        await arbitre.destroy()
        res.status(204).send()
    } catch (err) {
        next (err)
    }
}

exports.searchArbitres = async (req, res, next) => {
    try{
        const { confederation, statut } = req.query 
        const where = {}
        if (confederation) where.confederation = confederation
        if (statut) where.statut = statut
        const arbitres = await Arbitre.findAll({ where })
        res.status(200).json(arbitres)
    } catch (err) {
        next (err)
    }
}

exports.getArbitreMatches = async (req, res, next) => {
    try {
        const   {id} = req.params
        const arbitre = await Arbitre.findByPk(id, {
            include: [{
                model: Match,
                as: 'matches',
                through: { attributes: ['role'] }
            }]
        })
        if(!arbitre) {
            return res.status(404).json({ error: 'Arbitre not found' });
        }
        res.status(200).json(arbitre)
    } catch (err) {
        next(err)
    }
}