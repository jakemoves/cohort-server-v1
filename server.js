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
// app.use(function(req, res, next){
//   if (req.is('text/*')) {
//     req.text = '';
//     req.setEncoding('utf8');
//     req.on('data', function(chunk){ req.text += chunk });
//     req.on('end', next);
//   } else {
//     next();
//   }
// });

var jsonParser = bodyParser.json();

app.get('/listen', function(req, res){
	res.writeHead(200, {
 		'Transfer-Encoding': 'chunked', 
 		'Content-Type': 'text/event-stream',
 		'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write("retry: 3000\n");

    clients.push(res); // <- Add this client to those we consider "attached"
    clientIndex = (clients.length-1);
    console.log('new client: ' + clientIndex);
    req.on("close", function(){
      clients[clientIndex] == null;
      console.log('removed client: ' + clientIndex);
    });  // <- Remove this client when they disconnect
});

app.post('/broadcast', jsonParser, function(req, res) {
    broadcast(req.body);
    res.writeHead(200);
    console.log(req.body);
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
  //curtain-up
  sendCurtainUp(res, req);

  timer.setTimeout(sendGoSound1, [res, req], '5s');

  timer.setTimeout(sendGoSound2, [res, req], '700s');
  timer.setTimeout(sendGoSound3, [res, req], '1400s');
  timer.setTimeout(sendGoSound4, [res, req], '2100s');
});

function sendCurtainUp(res, req){
  broadcast('{ "action": "curtain-up" }');
}

function sendGoSound1(res, req){
  broadcast('{ "action": "sound-1-go" }');
}

function sendGoSound2(res, req){
  broadcast('{ "action": "sound-2-go" }');
}

function sendGoSound3(res, req){
  broadcast('{ "action": "sound-3-go" }');
} 

function sendGoSound4(res, req){
  broadcast('{ "action": "sound-4-go" }');
}

app.get('/simulate-end', function(req, res){
  broadcast('{ "action": "curtain-down" }');
});

timer.setInterval(emitHeartbeat, '', '10s');

function emitHeartbeat(){
	var heartbeatMsg = '{ "id": ' + (++id) + ', "body":"' + (new Date().getTime()) + '", "isHeartbeat":"true" }';
	//console.log(heartbeatMsg);
	broadcast(heartbeatMsg);
}

function broadcast(msg){
	var event = 'event: message\ndata: ' + msg + '\n\n';
	if(clients != 'undefined' && clients.length > 0){
		for(var i = 0; i < clients.length; i++){
      if(clients[i] != null){
			   clients[i].write(event);
			   //console.log("broadcast to client " + i);
       }
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
