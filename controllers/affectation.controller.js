const { Affectation, Arbitre, Match } = require('../models/index');

exports.getAllAffectations = async (req, res, next) => {
  try {
    const affectations = await Affectation.findAll({
      include: ['arbitre', 'match']
    });
    res.status(200).json(affectations);
  } catch (err) {
    next(err);
  }
};

exports.getAffectationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const affectation = await Affectation.findByPk(id, {
      include: ['arbitre', 'match']
    });
    if (!affectation) {
      return res.status(404).json({ error: 'Affectation not found' });
    }
    res.status(200).json(affectation);
  } catch (err) {
    next(err);
  }
};

exports.createAffectation = async (req, res, next) => {
  try {

    const { arbitreId, matchId } = req.body;
    const arbitre = await Arbitre.findByPk(arbitreId);
    if (!arbitre) {
      return res.status(404).json({ error: 'Arbitre not found' });
    }
    const match = await Match.findByPk(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const newAffectation = await Affectation.create(req.body);
    res.status(201).json(newAffectation);
  } catch (err) {
    next(err);
  }
};

exports.updateAffectation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const affectation = await Affectation.findByPk(id);
    if (!affectation) {
      return res.status(404).json({ error: 'Affectation not found' });
    }
    await affectation.update(req.body);
    res.status(200).json(affectation);
  } catch (err) {
    next(err);
  }
};

exports.deleteAffectation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const affectation = await Affectation.findByPk(id);
    if (!affectation) {
      return res.status(404).json({ error: 'Affectation not found' });
    }
    await affectation.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};