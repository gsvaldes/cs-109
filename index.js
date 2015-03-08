var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var todo = require('./lib/todo');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  var item_arr = todo.items();
  io.emit('todo list', item_arr);  // load existing todo array upon page refresh or new page
  
  socket.on('todo item', function(msg){
    console.log(msg['text']);
	console.log(msg['priority']);
	var item_arr = todo.addItem(msg['text'], msg['priority']);
	console.log(item_arr);
    io.emit('todo list', item_arr);
  });

  socket.on('removed id', function(id){
    console.log('id: ' + id);
	var item_arr = todo.removeItem(id);
	console.log(item_arr);
    io.emit('todo list', item_arr);
  });  

});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/todo', function(req, res) {
  res.sendFile(__dirname + '/views/todo.html');
});

app.get('/map', function(req, res) {
  res.sendFile(__dirname + '/views/map.html');
});


io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(app.get('port'), function(){
  console.log('listening on ');
});