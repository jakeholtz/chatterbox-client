document.write("Ashwin and Jake's Chatterbox");


$(document).ready(function(){
  app.init();
});


var app = {};


app.init = function(item){
  this.handleUsernameClick();
  this.handleSubmit();
  this.roomName = null;
  setInterval(this.fetch().bind(this), 2000);
};


app.send = function(message){
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


app.fetch = function(){
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.showChats(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


app.clearMessages = function(){
   $("#chats").children().remove();
};


app.renderMessage = function(message){
  var $username = $(`<p class="username">${message.username}</p>`);
  var $text = $(`<span class="chatmessage">${message.text}</span>`)
  var $chatmessage = $('<div class="chat"></div>');
  $('#chats').prepend($chatmessage);
  $chatmessage.append($username);
  $chatmessage.append($text);
};


app.renderRoom = function(room){
  var divStart = '<div>';
  var divEnd = '</div>';
  $('#roomSelect').append(divStart + JSON.stringify(room) + divEnd);
};


app.handleUsernameClick = function(friend){
  return true;
};


app.handleSubmit = function(message){
  return true;
};


app.showChats = function(data){
  for (var i = 0; i < data.results.length; i++){
    this.renderMessage(data.results[i]);
    console.log(data.results[i]);
  }
};

