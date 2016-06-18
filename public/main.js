//$.post('/messages', { author: 'Cade', text: 'Hello!' }).done(...)



'use strict'
$(document).ready(init); 

function init(){

  loadPage();
  $('.addNewMessage').click(addNewMessage);
  $('.submitMessage').click(submitMessage);
  $('.messageBoardArea').on('click', '.deleteMessage',  deleteMessage);
  $('.messageBoardArea').on('click', '.updateMessage',  updateMessage);
  $('.submitEdit').on('click', submitUpdtate);
 //$('.toDoList').on('click', '.Done',  taskCheck);
  $('.cancelAdd').click(cancelAdd);
  $('.cancelEdit').click(cancelEdit);
  $('.sortByAuthor').click(sortByAuthor);
  $('.sortByTime').click(sortByTime);
}

function loadPage(){

$.get('messages')
 .done(function (data){
    //console.log("data: " , data);
    var $messages = [];
    for(var  i=0;  i<data.length; i++){
      var $span = $('.template').clone();
      var author = data[i].author;
      var text = data[i].text;
      var id = data[i].id;
      var timestamp = data[i].createdAt;
      var imageURL = data[i].imageURL;
      //console.log("id: ", id);
      //console.log("author: " , author);
      //console.log("text: " , text);
      $span.find('.authorTemp').text(author);
      $span.find('.messageTemp').text(text);
      $span.find('.imageURLTemp').attr('src', `${imageURL}`);
      $span.find('.deleteMessage').data('id', id);
      //stroe errrything for update
      $span.find('.updateMessage').data('id', id);
      $span.find('.updateMessage').data('author', author);
      $span.find('.updateMessage').data('text', text);
      $span.find('.updateMessage').data('timestamp', timestamp);
      $span.find('.updateMessage').data('imageURL', imageURL);

      $span.removeClass('template');
      $messages.push($span);
    }
    $('.messageBoardArea').empty().append($messages);
 })
 .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}


function addNewMessage(){
  //console.log("In ADD MESSAGE");
  $('.showInput').show();
  $('.addNewMessage').hide();
  $('.cancelAdd').show();
  $('.author').val('');
  $('.txt').val('');
  $('.imageURL').val('');
}

function submitMessage(){
  $('.showInput').hide();
  $('.addNewMessage').show();
  //console.log("submit");
  var authory  = $('.author').val();
  var texty  = $('.txt').val();
  //var imageURLy  = $('.imageURL').val();
  var imageURLy = $( ".pugs option:selected" ).val();
  console.log("image url: ", imageURLy);

  $('.author').val('');
  $('.txt').val('');
  $('.imageURL').val('');
  var formData = {author : authory, text : texty, imageURL : imageURLy}; //Array 
 
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
  cancelAdd();
  cancelEdit();
  //console.log("In delete");
  //console.log($(this).data('id'));
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

function updateMessage(event){
  event.preventDefault();
  $('.cancelAdd').hide();
  $('.cancelEdit').show();
  console.log("HERE");
  $('.showInput').show();
  $('.addNewMessage').hide();
  $('.submitMessage').hide();
  $('.submitEdit').show();
  var id = $(this).data('id');
  var author = $(this).data('author');
  var text = $(this).data('text');
  var imageURL = $(this).data('imageURL');
  //console.log("id in update: ", id);
  $('.submitEdit').data('id', id);
  $('.author').val(author);
  $('.txt').val(text);
  $('.imageURL').val(imageURL);
}

//1f949a57-60ad-429c-8699-c72144363b0f is 4

function submitUpdtate(event){
  event.preventDefault();
  cancelEdit();
  $('.showInput').hide();
  $('.addNewMessage').show();
  var newAuthor = $('.author').val();
  var newText = $('.txt').val();
  var newImageURL = $('.imageURL').val();

  //console.log("new: ",newAuthor, " , " , newText);
  var id = $(this).data('id');

  //console.log("id in submit: ", id);
  var urly = `/messages/${id}`;
  var newOb = {author: `${newAuthor}`, text: `${newText}`, imageURL: `${newImageURL}`};
  //console.log("new ob: ", newOb);

  $.ajax({
    url: urly,
    type: 'PUT',
    dataType: 'json',
    data: newOb,
    success: function(data, status, jqXHR){
      console.log("stat: ", status);
      loadPage();
    },
    error: function(jqXHR, status, errorThrown){
      console.log("errthr: " ,errorThrown );
      loadPage();
    }
  })
}

function cancelAdd(){
  $('.showInput').hide();
  $('.addNewMessage').show();
}

function cancelEdit(){
  $('.showInput').hide();
  $('.addNewMessage').show();
  $('.cancelEdit').hide();
}

function sortByAuthor(){
  var urly = `messages/?sort=author`;

 $.get(urly)
 .done(function (data){
    //console.log("data: " , data);
    loadPage();
 })
 .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}

function sortByTime(){
var urly = `messages/?sort=timeStamp`;

 $.get(urly)
 .done(function (data){
    //console.log("data: " , data);
    loadPage();
 })
 .fail((jq, err, status )=> console.log("error : ", err, " status ", status));
}


