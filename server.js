const express = require('express'),
  mongoClient = require('mongodb').MongoClient;

const app = express();
require('./api/middleware')(app);

const port = process.env.PORT || 8080;

mongoClient.connect('mongodb://mlmutant:mlmutant@ds117590.mlab.com:17590/ml-mutant', (err , client) => {
  if (err) return console.log(err);

  app.dbCollection = client.db('ml-mutant').collection('mlmutant');

  app.listen(port, function (){
    console.log('Servidor iniciado en puerto:', port);
  })
});
