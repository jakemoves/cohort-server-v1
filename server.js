var http = require('http'),
	express = require('express'),
	NanoTimer = require('nanotimer'),
	bodyParser = require('body-parser'),
  	interval = 1000,
 	  port = 0,
  	id = 0,
  	timer = new NanoTimer(),
  	clients = [];

var app = express();

port = Number(process.env.PORT || 8000);
//port = 8000;

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

app.get('/listen', function(req, res){
	res.writeHead(200, {
 		'Transfer-Encoding': 'chunked', 
 		'Content-Type': 'text/event-stream',
 		'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write("retry: 3000\n");
    clients.push(res);
    console.log('new client: ' + (clients.length-1));
});

app.post('/broadcast', function(req, res) {
    broadcast(req.text);
    res.writeHead(200);
    console.log(req.text);
    var log = "broadcast to " + clients.length + " clients"
    res.write(log);
    res.send();
    console.log(log);
});

app.get('/test', function(req, res){
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.write("<DOCTYPE !html><html><head></head><body>Server is running</body></html>");
  res.send();
});

app.get('/simulate-start', function(req, res){
  // send we-have-the-house
  broadcast('{"action": "we-have-the-house" }');
  res.writeHead(200);
  console.log(req.text);
  var log = "broadcast we-have-the-house to " + clients.length + " clients"
  res.write(log);
  res.send();
  console.log(log);
  // send curtain-up after 10s
  timer.setTimeout(sendCurtainUp, [res, req], '15s');
});

function sendCurtainUp(res, req){
  broadcast('{ "action": "curtain-up" }');
  console.log(req.text);
  var log = "broadcast curtain-up to " + clients.length + " clients"
  res.write(log);
  res.send();
  console.log(log);
}

app.get('/simulate-end', function(req, res){
  broadcast('{ "action": "curtain-down" }');
  res.writeHead(200);
  console.log(req.text);
  var log = "broadcast curtain-down to " + clients.length + " clients"
  res.write(log);
  console.log(log);
});

timer.setInterval(emitHeartbeat, '', '20s');

function emitHeartbeat(){
	var heartbeatMsg = '{ "id": ' + (++id) + ', "body":"' + (new Date().getTime()) + '", "isHeartbeat":"true" }';
	//console.log(heartbeatMsg);
	broadcast(heartbeatMsg);
}

function broadcast(msg){
	var event = 'event: message\ndata: ' + msg + '\n\n';
	if(clients != 'undefined' && clients.length > 0){
		for(var i = 0; i < clients.length; i++){
			clients[i].write(event);
			//console.log("broadcast to client " + i);
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
