$(document).ready(function(){
  app.init();
});


var app = {};


app.init = function(item){
  this.handleUsernameClick();
  this.roomName = null;
  this.rooms = [];
  app.fetch();
  setInterval(app.fetch.bind(this), 2000);
  $( "#submit_button" ).on('click', function(event) {
      event.preventDefault()
      app.handleSubmit($('#message').val());
  });
};


app.send = function(message){
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      // this.data.val('');
      // this.fetch();
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
    data: "order=-createdAt",
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.showChats(data);
      app.getRooms(data);
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
  $('#chats').append($chatmessage);
  $chatmessage.append($username);
  $chatmessage.append($text);
};

app.getRooms = function(data){
  for (var prop in data.results) {
    if (!_.contains(this.rooms, data.results[prop].roomname)) {
      this.rooms.push(data.results[prop].roomname);
    }
  }
  this.rooms = Array.from(this.rooms).sort();
  for (var room in this.rooms){
    $('#roomselector').append(`<option value="${this.rooms[room]}">${this.rooms[room]}</option>`);
  }
}

app.renderRoom = function(room){
  this.roomName = room;
    $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.showChats(data);
      app.getRooms(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
  // this.fetch();
  var divStart = '<div>';
  var divEnd = '</div>';
  $('#roomSelect').append(divStart + JSON.stringify(room) + divEnd);
};


app.handleUsernameClick = function(friend){
  return true;
};


app.handleSubmit = function(message) {
    var message = {
      username: window.location.search.substr(10),
      text: message,
      roomname: 'lobby'
    };

    app.send(message);

    // Stop the form from submitting
}

app.showChats = function(data){
  if (this.roomName === null){
    for (var i = 0; i < data.results.length; i++){
      this.renderMessage(data.results[i]);
    }
  } else {
    for (var i = 0; i < data.results.length; i++){
      if (data.results[i].roomname == this.roomName){
        this.renderMessage(data.results[i]);
      }
    }
  }
};

