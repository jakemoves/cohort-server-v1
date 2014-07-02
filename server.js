var http = require('http'),
	express = require('express'),
	NanoTimer = require('nanotimer'),
  	interval = 1000,
 	port = 8000,
  	id = 0,
  	timer = new NanoTimer(),
  	clients = new Array();

console.log("finished instantiation");
/*
var server = http.createServer(function(req, res){
	var self = this;
 	res.writeHead(200, {
 		'Transfer-Encoding': 'chunked', 
 		'Content-Type': 'text/event-stream',
 		'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write("retry: 10000\n");
}).listen(port);

console.dir(server);

timer.setInterval(emitHeartbeat, '', '1s');

console.log('Streaming events on port ' + port);

function emitHeartbeat(){
	var event = 'event: message\ndata: {"id": ' + (++id) + ', "body":"' + (new Date().getTime()) + '", "author_id": 1, "conversation_id": 1}\n\n';
	//console.log(event);
	if(clients != 'undefined' && clients.length > 0){
		var i = 0;
		for(client in clients){
			//.write(event);
			console.log("broadcast to client " + i);
			i++;
		}
	}
}*/
