
//GROUP() ASSIGNS A PERSON TO BE EITHER RED OR BLUE
var group = function(){
  var ranNum = Math.random()*(2-1)+1;

  if(ranNum > 1.5){
    return  2;
  } else {
    return 1;
  };
}
var redblue = group();
console.log(redblue);

var info = document.getElementById("info");
var b1 = document.getElementById("b1");
var playerLayer = document.getElementById("playerLayer");

var audio = document.createElement('audio');
audio.src = 'http://webspace.ocad.ca/~lg14ig/media/simpleflux.mp3';


var cornersB = document.createElement('audio');
cornersB.src = 'http://webspace.ocad.ca/~lg14ig/media/cornersblue.mp3';
var cornersR = document.createElement('audio');
cornersR.src = 'http://webspace.ocad.ca/~lg14ig/media/cornersred.mp3';

var chipmeltB = document.createElement('audio');
chipmeltB.src = 'http://webspace.ocad.ca/~lg14ig/media/chipmeltblue.mp3';
var chipmeltR = document.createElement('audio');
chipmeltR.src = 'http://webspace.ocad.ca/~lg14ig/media/chipmeltred.mp3';

var hulaB = document.createElement('audio');
hulaB.src = 'http://webspace.ocad.ca/~lg14ig/media/hulablue.mp3';
var hulaR = document.createElement('audio');
hulaR.src = 'http://webspace.ocad.ca/~lg14ig/media/hulared.mp3';

var shipB = document.createElement('audio');
shipB.src = 'http://webspace.ocad.ca/~lg14ig/media/shipblue.mp3';
var shipR= document.createElement('audio');
shipR.src = 'http://webspace.ocad.ca/~lg14ig/media/shipred.mp3';

 var orbitalsB = document.createElement('audio');
 orbitalsB.src = 'http://webspace.ocad.ca/~lg14ig/media/orbitalsblue.mp3';
 var orbitalsR = document.createElement('audio');
  orbitalsR.src = 'http://webspace.ocad.ca/~lg14ig/media/orbitalsred.mp3';

var allAudio = [audio, cornersB, cornersR, chipmeltB, chipmeltR, hulaB, hulaR, shipB, shipR, orbitalsB, orbitalsR];

//--setting up boolean to only have one audio playback at a time
var tf = false;

var load = function(){
  for(var i =0; i< allAudio.length; i++){
  allAudio[i].load();
}
  console.log("audio loaded")
};

  source = new EventSource("/listen");

  source.addEventListener('open', function(e) {
      console.log("opened sse connection");
  }, false);

  source.addEventListener('error', function(e) {
      if (e.readyState == EventSource.CLOSED) {
        console.log("closed sse connection");
      }
  }, false);

  source.addEventListener('message', function(e) {
// audio.play();
    console.log("received sse");
    console.log(data);
      // var data = JSON.parse(e.data);
      // console.log(data.id, data.msg);
  }, false);

  source.addEventListener('cohortMessage', function(e) {

    //if tf is still false, play audio

console.log("received SSE");
    console.log(e);
      var data = JSON.parse(e.data);
      console.log(data.id, data.msg);

      var x = data["action"];

      if(tf===false){
        tf=true;

          if(redblue === 1){

            switch(x){
              case "episode-1-go": audio.play();
              break;

              case "episode-2-go": cornersB.play();
              break;

              case "episode-3-go": chipmeltB.play();
              break;

              case "episode-4-go": shipB.play();
              break;

              case "episode-5-go": hulaB.play();
              break;

              case "episode-6-go": orbitalsB.play();
              break;


              default: console.log("no music");
            }
          } else {
            switch(x){
              case "episode-1-go": audio.play();
              break;

              case "episode-2-go": cornersR.play();
              break;

              case "episode-3-go": chipmeltR.play();
              break;

              case "episode-4-go": shipR.play();
              break;

              case "episode-5-go": hulaR.play();
              break;

              case "episode-6-go": orbitalsR.play();
              break;


              default: console.log("no music");
            }


          }

          };


            if(x === "pause"){
              for(var i =0; i < allAudio.length; i ++){
                allAudio[i].pause();
                tf=false;
                console.log('paused');

              };

            };

            if(x === "stop"){
              for(var i =0; i < allAudio.length; i ++){
                if(allAudio[i].duration > 0 && !allAudio[i].paused){
                  allAudio[i].pause();
                  allAudio[i].currentTime = 0;
                  console.log('stopped');
                } else {
                allAudio[i].currentTime = 0;
                console.log('stopped');
                }

                tf=false;

            }
          }



  }, false);
//---returns tf = false when audio has finished. Loops through an array of all the audios
for(var i =0; i < allAudio.length; i ++){

  allAudio[i].addEventListener("ended", function(){
    tf=false;
    console.log("ended");
    });



};

$("#b1").click(function(){
  info.innerHTML = "Fantastic, you are now in queue. Please wait for audio instructions.";

  b1.innerHTML = "You are now checked-in!";

  playerLayer.style.visibility = "visible";

});
