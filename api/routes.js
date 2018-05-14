'use strict';

module.exports = app => {
  var mutantController = require('./mutant/controllers/mutantController');

  app.route('/mutant')
    .post(mutantController.isMutant);
  
  app.route('/stats')
    .get(mutantController.stats);
};
