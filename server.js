var http = require('http'),
	express = require('express'),
	NanoTimer = require('nanotimer'),
	bodyParser = require('body-parser'),
  	interval = 1000,
 	port = 8000,
  	id = 0,
  	timer = new NanoTimer(),
  	clients = [];

var app = express();

var server = app.listen(port, function(){
	console.log('Streaming events on port ' + port);
});

// for handling text/plain POST bodies
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
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
    console.log('new client: ' + clients.length);
});

app.post('/broadcast', function(req, res) {
    console.log(req.text);
	broadcast(req.text);
});

// timer.setInterval(emitHeartbeat, '', '1s');


function emitHeartbeat(){
	var heartbeatMsg = '{"id": ' + (++id) + ', "body":"' + (new Date().getTime()) + '"}';
	//console.log(heartbeatMsg);
	broadcast(heartbeatMsg);
}

function broadcast(msg){
	var event = 'event: message\ndata: ' + msg + '\n\n';
	if(clients != 'undefined' && clients.length > 0){
		for(var i = 0; i < clients.length; i++){
			clients[i].write(event);
			console.log("broadcast to client " + i);
		}
	}
}

// NOT USED RIGHT NOW
function validateJSON(jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns 'null', and typeof null === "object", 
        // so we must check for that, too.
        if (o && typeof o === "object" && o !== null) {
            return true;
        }
    }
    catch (e) { }

    return false;
}
