

'use strict';

const express = require('express');
let router = express.Router();
let Message = require('../models/message');
const path = require('path');



router.get('/', function(req, res) {

  console.log("Req.query: ", req.query);
  if(Object.keys(req.query).length){
    Message.sort(req.query, function(err) {
      if(err) return res.status(400).send(err);
      res.send(); // empty response (code 200)
    });
  }
  else{
    Message.get(function(err, messages) {
    if(err) return res.status(400).send(err);
    res.send(messages);
    });
  }
});

router.get('/:id', function(req, res) {
  Message.getById(req.params.id, function(err, messages) {
    if(err) return res.status(400).send(err);
    res.send(messages);
  });
});

router.post('/', function(req, res) {
  Message.create(req.body.text, req.body.author, req.body.imageURL, function(err) {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});

router.delete('/:id', (req, res) => {
  Message.delete(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });
});

router.put('/:id', (req, res) => {
  console.log("body: ", req.body, "params.id: ",req.params.id);
  Message.update(req.body, req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send(); // empty response (code 200)
  });


});

module.exports = router;