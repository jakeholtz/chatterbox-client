// YOUR CODE HERE:
document.write("Ashwin and Jake's Chatterbox");

var app = {};

app.init = function(item){
  this.handleUsernameClick();
  this.handleSubmit();
  return !!item; };
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
  var divStart = '<div>';
  var divEnd = '</div>';
  $('#chats').append(divStart + JSON.stringify(message) + divEnd);
};

app.renderRoom = function(room){
  var divStart = '<div>';
  var divEnd = '</div>';
  $('#roomSelect').append(divStart + JSON.stringify(room) + divEnd);
};

app.handleUsernameClick = function(friend){

};

app.handleSubmit = function(message){

};

