'use strict';

//const PORT = 8000;
//for heroku use process port, otherwise if local use 80000
const PORT = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
//const Message = require('./message');


let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// static routing!!  (frontend css, js, etc.)
app.use(express.static('public'));

app.get('/', function(req, res) {
  console.log("req: ", req);
  let indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});




//router
app.use('/messages', require('./routes/messages'));
/*app.get('/messages', (req, res) => {
  console.log("Req.query: ", req.query);
  Message.sort(req.query, function(err) {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});*/


// defines a GET request to a url




app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});