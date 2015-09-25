
//---boolean to help determine if button has been pressed
var tf = false;

//---sets up layer during playback
var canvas = document.getElementById('playerLayer');
var loading = document.getElementById('loading');
//--this captures today's date (0-31)
var date = new Date();
var day = date.getDate();

//---creating audio element to play for Android Stream

var audio = document.createElement('audio');
audio.src = 'media/corners.mp3';

var audioScoreTwo = document.createElement('audio2');
audioScoreTwo.src = 'media/simpleflux.mp3';

var audioScoreThree = document.createElement('audio3');
audioScoreThree.src = 'media/simpleflux.mp3';

var audioScoreFour = document.createElement('audio4');
audioScoreFour.src = 'media/simpleflux.mp3';

var audioScoreFive = document.createElement('audio5');
audioScoreFive.src = 'media/simpleflux.mp3';

var audioScoreSix = document.createElement('audio6');
audioScoreSix.src = 'media/simpleflux.mp3';

//---to eventually be set as 8, so that conditions only allow stream to happen on August 8th.
var fluxDay = 8;


//---SSE

var audio = document.createElement('audio');
audio.src = 'media/corners.mp3';

var audioScoreTwo = document.createElement('audio');
audioScoreTwo.src = 'media/simpleflux.mp3';

var audioScoreThree = document.createElement('audio');
audioScoreThree.src = 'media/simpleflux.mp3';

var audioScoreFour = document.createElement('audio');
audioScoreFour.src = 'media/simpleflux.mp3';

var audioScoreFive = document.createElement('audio');
audioScoreFive.src = 'media/simpleflux.mp3';

var audioScoreSix = document.createElement('audio');
audioScoreSix.src = 'media/simpleflux.mp3';



var load = function(){
  audio.load();
  console.log("audio loaded")
}

  source = new EventSource("http://cohort-server-dev.herokuapp.com/listen");

  source.addEventListener('open', function(e) {
      console.log("opened sse connection");
  }, false);

  source.addEventListener('error', function(e) {
      if (e.readyState == EventSource.CLOSED) {
        console.log("closed sse connection");
      }
  }, false);

  source.addEventListener('message', function(e) {

    console.log("received sse");
    console.log(data);
      // var data = JSON.parse(e.data);
      // console.log(data.id, data.msg);
  }, false);

  source.addEventListener('cohortMessage', function(e) {


    console.log("received sse");
    console.log(e);
      var data = JSON.parse(e.data);
      //console.log(data.id, data.msg);
      var x = data["action"];
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

  }, false);




// ---stream function. Only happens when user meets the conditions of Clicking Ok, having it be the right date, and the button not having been pressed before (playerLayer mostly takes care of this by not allowing the user to click the button again, and re-trigger the audio, but on a keyboard the user can still potentially trigger by pressing space)
var android = function(){

  var location = confirm("FluxDelux gets going at Nathan Philips Square, on August 8th, 2015! If you're already there, get your head phones plugged in and ready to go, then hit OK");
    if(location === true && day === fluxDay && tf === false){
        audio.play();
        canvas.style.visibility = "visible";
        loading.style.visibility= "visible";

        tf=true

    } else if(location === true && day !== fluxDay){// in case it's not the right date, changing the stream button's text
        document.getElementById("b1").innerHTML = '<img src = "img/android.png" width=\'25px\' height=\'25px\'>' + " " + "Come back on August 8th!";
  };
  // audio.onended=function(){ // once the music is over, returning everything to a ready state, but changing the text to aknowledge the end of Flux
  //   tf=false;
  //   audio.load();
  //   canvas.style.visibility ="hidden";
  //   document.getElementById("info").innerHTML = "Thank you for participating!";
  //
  // }
};

audio.onplaying = function(){
  loading.style.visibility = "hidden";
};

audio.onended=function(){ // once the music is over, returning everything to a ready state, but changing the text to aknowledge the end of Flux
  tf=false;
  audio.load();
  canvas.style.visibility ="hidden";
  document.getElementById("info").innerHTML = "Thank you for participating!";

};
