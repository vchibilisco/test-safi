const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
require('./api/middleware')(app);

const port = process.env.PORT || 8080;

app.listen(port, function (){
  console.log('Service: ', port);
});
