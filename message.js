'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const moment = require('moment');

const dataPath = path.join(__dirname, 'data.json');

exports.get = cb => {
  readMessages(cb);
};

exports.create = (newMessage, newAuthor, cb) => {
  readMessages((err, messages) => {
    if(err) return cb(err);

    //var name = "add name"
    let messageObj = {
      author: newAuthor,
      text: newMessage,
      createdAt: moment(),
      id: uuid()
    };

    messages.push(messageObj);
    
    writeMessages(messages, cb);
  });
}

exports.getById = (id, cb) => {
  readMessages((err, messages) => {
    if(err) return cb(err);
  
    //find messages
     messages = messages.filter(messageObj => messageObj.id === id);
     cb(null, messages);
  });
}

exports.delete = (id, cb) => {
  readMessages((err, messages) => {
    if(err) return cb(err);

    // remove the message
    messages = messages.filter(messageObj => messageObj.id !== id);

    writeMessages(messages, cb);
  });
}

function readMessages(cb) {
  // read and parse
  fs.readFile(dataPath, (err, data) => {
    if(err) return cb(err);

    try {
      var messages = JSON.parse(data);
    } catch(e) {
      var messages = [];
    }

    cb(null, messages);
  });
}

exports.update = (newMessageOb, id, cb) => {
  readMessages((err, messages) => {
    if(err) return cb(err);
    console.log(newMessageOb);
    
    var message = messages.filter(messageObj => messageObj.id == id);

    if(newMessageOb['author']){
      var newAuthor = newMessageOb['author'];
    }
    else{
     var newAuthor = message[0].author;
    }

    if(newMessageOb['text']){
      var newText = newMessageOb['text'];
    }
    else{
      var newText = message[0].text;
    }

    //var name = "add name"
   let messageObj = {
      author: newAuthor,
      text: newText,
      createdAt: moment(),
      id: id
    };
    messages = messages.filter(messageObj => messageObj.id !== id);
    messages.push(messageObj);
    writeMessages(messages, cb);
  });
}

/*exports.sort = (query, cb) => {
  readMessages((err, messages) => {
    if(err) return cb(err);

     console.log("query: " , query);
  });
}*/

function writeMessages(messages, cb) {
  // stringify and write
  fs.writeFile(dataPath, JSON.stringify(messages), cb);
}

