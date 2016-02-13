var http = require('http'),
	express = require('express'),
  cors = require('cors'),
	NanoTimer = require('nanotimer'),
	bodyParser = require('body-parser'),
  Datastore = require('nedb'),
  db = new Datastore({ filename: "events.db", autoload: true }),
  	interval = 1000,
 	  port = 0,
  	id = 0,
  	timer = new NanoTimer(),
  	clients = [];

var app = express();

port = Number(process.env.PORT || 8000);
//port = 8000;

app.use(express.static('public'));

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
  var msg = { "action": "episode-3-go" };
  broadcast("cohortMessage", msg);

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write("<DOCTYPE !html><html><head></head><body>Sent simulated event start signal.</body></html>");
  res.send();
});

app.get('/events', function(req, res){
  db.find({}, function(err, docs){
    console.log(docs);
    if(!err){
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(docs));
      res.send();
    } else {
      res.writeHead(400);
      res.write("" + err);
      res.send();
    }
  });
});

app.get('/events/upcoming', function(req, res){
  db.find({}, function(err, docs){
    console.log(docs);
    if(!err){
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      var today = Date.now();
      var upcomingEvents = new Array;
      for(i=0; i<docs.length; i++){
        var evnt = docs[i];
        console.log(evnt.date);
        var eventDate = Date.parse(evnt.date);
        console.log("event: " + eventDate + ", today: " + today);
        if(eventDate > today) {
          upcomingEvents.push(evnt);
        }
      }
      console.log(upcomingEvents);
      res.write(JSON.stringify(upcomingEvents));
      res.send();
    } else {
      res.writeHead(400);
      res.write("" + err);
      res.send();
    }
  });
});

app.post('/events/create', jsonParser, function(req, res) {
  var resText;
  // console.log('received create-event');
  // console.log(req.body);
  var eventInfo = req.body;
  // basic validation
  if( eventInfo.city &&
      eventInfo.venue &&
      eventInfo.address &&
      eventInfo.geocode &&
      eventInfo.date &&
      eventInfo.startTime &&
      eventInfo.endTime &&
      eventInfo.checkInCode) 
    {
      db.insert(eventInfo, function(err, newDoc){
        if(err){
          console.log(err);
          resText = err;
          res.writeHead(400);
        } else {
          resText = "Created new event with id: " + newDoc._id;
          res.writeHead(200);
        }
        res.write(resText);
        res.send();
      });
  } else {
    res.writeHead(400);
    res.write('Event is missing required information');
    res.send();
  }
});

app.post('/events/delete', jsonParser, function(req, res) {
  var resText;
  // console.log('received create-event');
  // console.log(req.body);
  // basic validation
  if( req.body.eventId) {
      db.remove({ _id: req.body.eventId }, {}, function(err, numRemoved){
        if(err || numRemoved !== 1){
          if(err){
            console.log(err);
            resText = err;
          } else {
            resText = "Failed to delete event";
          }
          res.writeHead(400);
        } else {
          resText = "Deleted " + numRemoved + " event";
          res.writeHead(200);
        }
        res.write(resText);
        res.send();
      });
  } else {
    res.writeHead(400);
    res.write('Delete request is missing event ID');
    res.send();
  }
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
