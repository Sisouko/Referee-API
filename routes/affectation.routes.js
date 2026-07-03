const express = require('express');
const router = express.Router();
const affectationController = require('../controllers/affectation.controller');
const { validateAffectation } = require('../middlewares/validate.middleware');

router.route('/')
  .get(affectationController.getAllAffectations)
  .post(validateAffectation, affectationController.createAffectation);

router.route('/:id')
  .get(affectationController.getAffectationById)
  .put(validateAffectation, affectationController.updateAffectation)
  .delete(affectationController.deleteAffectation);

module.exports = router;