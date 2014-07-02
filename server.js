var http = require('http'),
	express = require('express'),
	NanoTimer = require('nanotimer'),
  	interval = 1000,
 	port = 8000,
  	id = 0,
  	timer = new NanoTimer(),
  	clients = [];

var app = express();

var server = app.listen(port, function(){
	console.log('Streaming events on port ' + port);
});

app.get('/', function(req, res){
	res.writeHead(200, {
 		'Transfer-Encoding': 'chunked', 
 		'Content-Type': 'text/event-stream',
 		'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write("retry: 10000\n");
    clients.push(res);
});

function emitHeartbeat(){
	var event = 'event: message\ndata: {"id": ' + (++id) + ', "body":"' + (new Date().getTime()) + '"}\n\n';
	//console.log(event);
	if(clients != 'undefined' && clients.length > 0){
		for(var i = 0; i < clients.length; i++){
			clients[i].write(event);
			console.log("broadcast to client " + i);
		}
	}
}

timer.setInterval(emitHeartbeat, '', '1s');
