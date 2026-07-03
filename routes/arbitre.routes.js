const express = require('express')
const router = express.Router()
const arbitreController = require('../controllers/arbitre.controller')
const { validateArbitre } = require('../middlewares/validate.middleware')


router.route('/')
     .get(arbitreController.getAllArbitres)
     .post(validateArbitre, arbitreController.createArbitre)


router.route('/id:')
     .get(arbitreController.getArbitreById)
     .put(validateArbitre, arbitreController.updateArbitre)
     .delete(arbitreController.deleteArbitre)

router.get('/search', arbitreController.searchArbitres);

router.get('/:id/matchs', arbitreController.getArbitreMatches);



     module.exports = router;
