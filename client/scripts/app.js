
// YOUR CODE HERE:
var App = function() {

};

App.prototype.init = function() {

};

App.prototype.send = function(message) {
  console.log('SENDING STUFF!!');
  // $('#chats').empty();
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

App.prototype.fetch = function() {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    success: function (data) {
      for (var i = 0; i < data.results.length; i++) {
        
        console.log(data.results[i].roomname);
        var user = data.results[i].username;
        var userWords = data.results[i].text;
        $('ul').append('<li class="list">' + user.toString() + ': ' + userWords.toString() + '</li><br><br>');
      }
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};


var app = new App();
  
$(document).ready(function() {

  $('form').submit('click', function(e) {
    e.preventDefault();
    var messageVal = $('input').val();
    var newMessage = {
      username: 'Disgustingly Optimistic',
      text: messageVal,
      roomname: '4'
    };
    var string = JSON.stringify(newMessage);
    window.location.reload();
    app.send(string);
  });
});

setInterval(function() {
  app.fetch();
}, 750);  
app.fetch();
  
  


