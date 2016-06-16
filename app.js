'use strict';

const PORT = 8000;


const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const message = require('./messages');

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// static routing!!  (frontend css, js, etc.)
app.use(express.static('public'));

// defines a GET request to a url
app.get('/', function(req, res) {
  let indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.get('/names', function(req, res) {
  Name.get(function(err, names) {
    if(err) return res.status(400).send(err);
    res.send(names);
  });
});

app.post('/names', function(req, res) {
  Name.create(req.body.name, function(err) {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});

app.delete('/names/:id', (req, res) => {
  Name.delete(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});


app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});