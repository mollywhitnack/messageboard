'use strict';

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const moment = require('moment');

const dataPath = path.join(__dirname, 'data.json');

exports.get = cb => {
  readMessages(cb);
};

exports.create = (newMessage, newAuthor, newImageURL, cb) => {
  readMessages((err, messages) => {
    if(err) return cb(err);

    //var name = "add name"
    let messageObj = {
      author: newAuthor,
      text: newMessage,
      createdAt: moment().unix(),
      id: uuid(),
      imageURL: newImageURL
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
  console.log("MESSAGE UPDATE");
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


    if(newMessageOb['imageURL']){
      var newImageURL = newMessageOb['imageURL'];
    }
    else{
     var newImageURL = message[0].imageURL;
    }

    //var name = "add name"
   let messageObj = {
      author: newAuthor,
      text: newText,
      createdAt: moment(),
      id: id,
      imageURL : newImageURL
    };

    messages = messages.filter(messageObj => messageObj.id !== id);

    messages.push(messageObj);
    writeMessages(messages, cb);
  });
}


exports.sort = (query, cb) => {
  console.log("query: ", query);
  readMessages((err, messages) => {
    if(err) return cb(err);

    var qu = query['sort'];
     console.log("messages: " , messages);
  
    if(qu == 'author'){
     messages.sort(function(a,b){
      console.log( a.author ," -------vs------ " , b.author);
        if( a.author.toLowerCase() < b.author.toLowerCase()){
         return -1;
       }
        if( a.author.toLowerCase() > b.author.toLowerCase()) return 1;
        return 0;
     });
    }

    if(qu == 'timeStamp'){
     messages.sort(function(a,b){
    console.log( a.createdAt ," -------vs------ " , b.createdAt);
        if( a.createdAt < b.createdAt){
         return -1;
       }
        if( a.createdAt > b.createdAt) return 1;
        return 0;
     });
    }
    writeMessages(messages, cb);
  });
}


function writeMessages(messages, cb) {
  // stringify and write
  fs.writeFile(dataPath, JSON.stringify(messages), cb);
}



