//$.post('/messages', { author: 'Cade', text: 'Hello!' }).done(...)



'use strict'
$(document).ready(init); 

function init(){

  loadPage();
  $('.addNewMessage').click(addNewMessage);
  $('.submitMessage').click(submitMessage);
  $('.messageBoardArea').on('click', '.deleteMessage',  deleteMessage);
  $('.messageBoardArea').on('click', '.updateMessage',  updateMessage);
 //$('.toDoList').on('click', '.Done',  taskCheck);

}



function loadPage(){

$.get('/messages')
 .done(function (data){
    console.log("data: " , data);
    var $messages = [];
    for(var  i=0;  i<data.length; i++){
      var $span = $('.template').clone();
      var author = data[i].author;
      var text = data[i].text;
      var id = data[i].id;
      console.log("id: ", id);
      //console.log("author: " , author);
      //console.log("text: " , text);
      $span.find('.authorTemp').text(author);
      $span.find('.messageTemp').text(text);
      $span.find('.deleteMessage').data('id', id);
      $span.find('.updateMessage').data('id', id);
      $span.removeClass('template');
      $messages.push($span);
    }
    $('.messageBoardArea').empty().append($messages);
 })
 .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}


function addNewMessage(){
  console.log("HERE");
  $('.showInput').show();
  $('.addNewMessage').hide();
}

function submitMessage(){
  $('.showInput').hide();
  $('.addNewMessage').show();
  console.log("submit");
  var authory  = $('.author').val();
  var texty  = $('.txt').val();
  $('.author').val('');
  $('.txt').val('');
  var formData = {author : authory, text : texty}; //Array 
 
$.ajax({
    url : '/messages',
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
      console.log("data: " , data);
      loadPage();
        //data - response from server
    },
    error: function (jqXHR, status, error)
    {
       console.log("error: " , error);
       console.log("status: " , status);
 
    }

});
}

function deleteMessage(){
  console.log("In delete");
  console.log($(this).data('id'));
  var id = $(this).data('id');

  var urly = `/messages/${id}`

  $.ajax({
    url: urly,
    type: 'DELETE',
    success: function(data, status)
    {
      //console.log("data: " , data);
      loadPage();
        //data - response from server
    },
    error: function (jqXHR, status, error)
    {
       console.log("error: " , error);
       console.log("status: " , status);
 
    }
  });

}

function updateMessage(){
  console.log("HERE");
  $('.showInput').show();
  $('.addNewMessage').hide();
}

function submitUpdate(){
  console.log("In edit");
  console.log($(this).data('id'));
  var id = $(this).data('id');

  var urly = `/messages/${id}`
  /*$.ajax({
    url: '/echo/html/',
    type: 'PUT',
    data: "name=John&location=Boston",
    success: function(data) {
    alert('Load was performed.');
  }
  });*/
}

 /* $.ajax({
    url : '/messages',
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
      console.log("data: " , data);
      loadPage();
        //data - response from server
    },
    error: function (jqXHR, status, error)
    {
       console.log("error: " , error);
       console.log("status: " , status);
 
    }

});*/




 /* $.post('/messages', function(text, author))
   .done(function (data){
    })
   .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}*/

