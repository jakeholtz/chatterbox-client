// YOUR CODE HERE:
document.write("Ashwin and Jake's Chatterbox");

var app = {};
  // url: 'http://parse.sfm6.hackreactor.com/2745f6eedad1770c6ebaf03f8a97cf0cc2f66706',
  // dataType: 'JSON',
  // headers: { "HeaderName": "4f44a6835e581124936858b658e8ea99e278d371" }

app.init = function(item){ return true; };
app.send = function(message){
	this.type = 'POST';
  this.data = JSON.stringify(message);
  
  $.ajax(this);
};

app.fetch = function(){
  this.type = 'GET';
  $.ajax(this);
};

app.clearMessages = function(){
   $( "#chats" ).remove();
};

// app.renderMessage = function(message){
//    $( "#chats" ).append('<div>'+message+'</div>');
// };