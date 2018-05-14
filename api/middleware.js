const bodyParser = require('body-parser'),
  router = require('./router');

module.exports = app => {

  app.use(bodyParser.json());

  app.use('/api/v1/', router);

};
