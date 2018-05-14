var express = require('express'),
    bodyParser = require('body-parser'),
    mongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());

var routes = require('./api/routes');

routes(app);

mongoClient.connect('mongodb://mlmutant:mlmutant@ds117590.mlab.com:17590/ml-mutant', (err , client) => {
  if (err) return console.log(err);

  app.dbCollection = client.db('ml-mutant').collection('mlmutant');

  app.listen(port, function (){
    console.log('Servidor iniciado en puerto:', port);
  })
});
