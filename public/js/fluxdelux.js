var info = document.getElementById("info");
var b1 = document.getElementById("b1");
var playerLayer = document.getElementById("playerLayer")

var audio = document.createElement('audio');
audio.src = 'http://webspace.ocad.ca/~lg14ig/media/corners.mp3';

var audioScoreTwo = document.createElement('audio');
audioScoreTwo.src = '/media/test.mp3';

var audioScoreThree = document.createElement('audio');
audioScoreThree.src = 'http://webspace.ocad.ca/~lg14ig/media/chip melt.mp3';

var audioScoreFour = document.createElement('audio');
audioScoreFour.src = 'http://webspace.ocad.ca/~lg14ig/media/ship.mp3';

var audioScoreFive = document.createElement('audio');
audioScoreFive.src = 'http://webspace.ocad.ca/~lg14ig/media/simpleflux.mp3';

var audioScoreSix = document.createElement('audio');
 audioScoreSix.src = 'http://webspace.ocad.ca/~lg14ig/media/simpleflux.mp3';

var allAudio = [audio, audioScoreTwo, audioScoreThree, audioScoreFour, audioScoreFive, audioScoreSix];

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

            switch(x){
              case "episode-1-go": audio.play();
              break;

              case "episode-2-go": audioScoreTwo.play();
              break;

              case "episode-3-go": audioScoreThree.play();
              break;

              case "episode-4-go": audioScoreFour.play();
              break;

              case "episode-5-go": audioScoreFive.play();
              break;

              case "episode-6-go": audioScoreSix.play();
              break;


              default: console.log("no music");
            }

          };

            if(x === "pause"){
              for(var i =0; i < allAudio.length; i ++){
                allAudio[i].pause();
                tf=false
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

                tf=false

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
  
  b1.innerHTML = "You are now standying by!";

  playerLayer.style.visibility = "visible";

})
