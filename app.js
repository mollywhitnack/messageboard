'use strict';

const PORT = 8000;


const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Message = require('./message');

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

app.get('/messages', function(req, res) {
  Message.get(function(err, messages) {
    if(err) return res.status(400).send(err);
    res.send(messages);
  });
});

app.get('/messages/:id', function(req, res) {
  Message.getById(req.params.id, function(err, messages) {
    if(err) return res.status(400).send(err);
    res.send(messages);
  });
});

app.post('/messages', function(req, res) {
  Message.create(req.body.text, req.body.author, function(err) {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});

app.delete('/messages/:id', (req, res) => {
  Message.delete(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});

app.put('/messages/:id', (req, res) => {
  Message.update(req.body, req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});

app.get('/messages?:', (req, res) => {
  console.log("Req.query: ", req.query);
  /*Message.sort(req.query, function(err) {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });*/
});

app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});