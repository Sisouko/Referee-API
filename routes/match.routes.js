const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');
const { validateMatch } = require('../middlewares/validate.middleware');

router.route('/')
  .get(matchController.getAllMatchs)
  .post(validateMatch, matchController.createMatch);

router.route('/:id')
  .get(matchController.getMatchById)
  .put(validateMatch, matchController.updateMatch)
  .delete(matchController.deleteMatch);

router.get('/:id/arbitres', matchController.getMatchArbitres);

router.get('/filter', matchController.filterMatchs);

module.exports = router;