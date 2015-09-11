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

    //console.log('finished /listen');
});

app.post('/broadcast', jsonParser, function(req, res) {
    broadcast("cohortMessage", req.body);
    res.writeHead(200);
    console.log(req.body);
    var log = {"response": "broadcast to " + clients.length + " clients"}
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
  var msg = { "action": "episode-1-go" };
  broadcast("cohortMessage", msg);

  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.write("<DOCTYPE !html><html><head></head><body>Sent simulated event start signal.</body></html>");
  res.send();
});

timer.setInterval(emitHeartbeat, '', '10s');

function emitHeartbeat(){
	var heartbeatMsg = {
    "id": (++id),
    "time": (new Date().getTime())
  };

	//console.log("heartbeatMsg: \n" + heartbeatMsg);
	broadcast("heartbeat", heartbeatMsg);
}

function broadcast(eventName, msg){
	var event = "event: " + eventName + "\ndata: " + JSON.stringify(msg) + "\n\n";
	if(clients != 'undefined' && clients.length > 0){
		for(var i = 0; i < clients.length; i++){
      if(clients[i] != null){
			   clients[i].write(event);
			   //console.log("broadcast to client " + i);
       }
		}
	}
}
