const express = require('express'),
  router = express.Router();

const mutantController = require('./mutant/controllers/mutantController');

router.post('/mutant', mutantController.isMutant);

router.get('/stats', mutantController.stats);

module.exports = router;
