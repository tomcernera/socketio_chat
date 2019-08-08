var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


//serves up the static file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//shows if a user has connected or disconnected
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//console logs a message
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});