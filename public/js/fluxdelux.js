var GroupEnum = {
    BLUE: 1,
    RED: 2,
    properties: {
        1: {name: "blue", value: 1},
        2: {name: "red", value: 2}
    }
};

var episodes = [
    {
        "name": "test",
        "displayName": "Test Episode"
    },
    {
        "name": "simpleflux",
        "displayName": "Simple Flux"
    },
    {
        "name": "corners",
        "displayName": "Corners"
    },
    {
        "name":  "chipmelt",
        "displayName": "Chip Melt"
    },
    {
        "name": "hulalasso",
        "displayName": "Hula Lasso"
    },
    {
        "name": "ship",
        "displayName": "Ship"
    },
    {
        "name": "orbitals",
        "displayName": "Orbitals"
    }
]

var numberOfEpisodes = episodes.length;
var source;

var participantGroup = assignGroup();
console.log("participantGroup: " + GroupEnum.properties[participantGroup].name);

var participantIsCheckedIn = false;

var currentEpisodeAudio;
var Index;

var playerLayer = document.getElementById('playerLayer');
var manual = document.getElementById('manual');
var pageTwo = document.getElementById("page02");
var info = document.getElementById("info");
var b1 = document.getElementById("b1");
// var playerLayer = document.getElementById("playerLayer");

//LOADING ALL THE AUDIO ELEMENTS
//SIMPLEFLUX IS REPLACED WITH A SHORT TEST.MP3 THATS ONLY 30s LONG
var test = document.createElement('audio');
test.src = 'https://s3.amazonaws.com/fluxdelux.org/test.mp3';
test.preload = "none";

var simpleFluxB = document.createElement('audio');
simpleFluxB.src = 'https://s3.amazonaws.com/fluxdelux.org/simplefluxblue.mp3';
simpleFluxB.preload = "none";
var simpleFluxR = document.createElement('audio');
simpleFluxR.src = 'https://s3.amazonaws.com/fluxdelux.org/simplefluxred.mp3';
simpleFluxR.preload = "none";

var cornersB = document.createElement('audio');
cornersB.src = 'https://s3.amazonaws.com/fluxdelux.org/cornersblue.mp3';
cornersB.preload = "none";
var cornersR = document.createElement('audio');
cornersR.src = 'https://s3.amazonaws.com/fluxdelux.org/cornersred.mp3';
cornersR.preload = "none";

var chipmeltB = document.createElement('audio');
chipmeltB.src = 'https://s3.amazonaws.com/fluxdelux.org/chipmeltblue.mp3';
chipmeltB.preload = "none";
var chipmeltR = document.createElement('audio');
chipmeltR.src = 'https://s3.amazonaws.com/fluxdelux.org/chipmeltred.mp3';
chipmeltR.preload = "none";

var hulaB = document.createElement('audio');
hulaB.src = 'https://s3.amazonaws.com/fluxdelux.org/hulablue.mp3';
hulaB.preload = "none";
var hulaR = document.createElement('audio');
hulaR.src = 'https://s3.amazonaws.com/fluxdelux.org/hulared.mp3';
hulaR.preload = "none";

var shipB = document.createElement('audio');
shipB.src = 'https://s3.amazonaws.com/fluxdelux.org/shipblue.mp3';
shipB.preload = "none";
var shipR = document.createElement('audio');
shipR.src = 'https://s3.amazonaws.com/fluxdelux.org/shipred.mp3';
shipR.preload = "none";

var orbitalsB = document.createElement('audio');
orbitalsB.src = 'https://s3.amazonaws.com/fluxdelux.org/orbitalsblue.mp3';
orbitalsB.preload = "none";
var orbitalsR = document.createElement('audio');
orbitalsR.src = 'https://s3.amazonaws.com/fluxdelux.org/orbitalsred.mp3';
orbitalsR.preload = "none";

//SETTING UP ARRAY OF ALL THE AUDIO FILES FOR FUTUR FOR LOOPS

var allAudio = [test, simpleFluxB, simpleFluxR, cornersB, cornersR, chipmeltB, chipmeltR, hulaB, hulaR, shipB, shipB, orbitalsB, orbitalsR];

//--setting up boolean to only have one audio playback at a time
var audioIsPlaying = false;

// I HAD A LOT OF FOR LOOPS BEFORE..AND THEN THE INTERNET TOLD ME IT WAS BAD..I STILL HAVE A COUPLE
// var load = function(){
//   for(var i =0; i< allAudio.length; i++){
//   allAudio[i].load();
// }
//   console.log("audio loaded");
// };

//LOAD FUNCTION FIRES ON BUTTON CLICK. SOUND FILE GETS LOADED ACCORDING TO WHICH "PRELOAD" NUMBER WE SEND
var load = function () {
    switch (Index) {
        case 0:
            test.load();
            break;

        case 1:
            simpleFluxB.load();
            simpleFluxR.load();
            break;

        case 2:
            cornersB.load();
            cornersR.load();
            break;

        case 3:
            chipmeltB.load();
            chipmeltR.load();
            break;

        case 4:
            shipB.load();
            shipR.load();
            break;

        case 5:
            hulaB.load();
            hulaR.load();
            break;

        case 6:
            orbitalsB.load();
            orbitalsR.load();
            break;

        default:
            console.log("could not load audio for index " + Index);
    }

    console.log("audio loaded");
//CHANGE UI AFTER USER CHECKS IN
    info.innerHTML = "<h4>Fantastic, you are now in queue. Please put your headphones on and wait for audio instructions.</h4>";
    //I NOW HAVE THE BUTTON HIDING SO THAT USERS DON'T KEEP PRESSING IT AND LOADING THE AUDIO AGAIN AND AGAIN.
    // b1.innerHTML = "Checked-in!";
};

var checkin = function(){
    var passcode = $('#passcode').val();
    if(passcode === "nbto"){
        subscribeToServerSentEvents();
        participantIsCheckedIn = true;
        info.innerHTML = "<h4>When the next episode starts in a few minutes, we’ll loop you in. Until then:</h4><h4>move into the open space along a curving path<br />be careful not to bump or brush against anyone else<br />vary your speed whenever you want<br />pause and be still whenever the impulse strikes you<br />follow beside or behind others when you want<br />copy, repeat, and experiment with movements that you see around you, whenever you want</h4>"
        $('#check-in').css('display', 'none');

    } else if(passcode === "gogogo"){
      console.log("go");
      pageTwo.style.visibility = "visible";

    } else {
        $('#passcode').attr('placeholder', 'Incorrect passcode');
    }
}

var checkout = function(){
    source.close();
    info.innerHTML = "<h4>Welcome to <i>FluxDelux</i>!</h4><h4>If you're in our space at the <a href=\"https://www.google.ca/maps?client=safari&rls=en&q=trinity+community+recreation+centre&oe=UTF-8&gfe_rd=cr&um=1&ie=UTF-8&sa=X&ved=0CAcQ_AUoAWoVChMIhtr7--elyAIVyXE-Ch1fyQw1\">Trinity Community Recreation Center</a>, enter the check-in passcode.</h4>"
    $('#check-out').css('display', 'none');
    $('#survey').css('display', 'block');
    $('#check-in').css('display', 'block');
}

var subscribeToServerSentEvents = function(){
    //THIS IS FROM YOUR CODE
    source = new EventSource("/listen");

    source.addEventListener('open', function (e) {
        console.log("opened sse connection");
    }, false);

    source.addEventListener('error', function (e) {
        if (e.readyState == EventSource.CLOSED) {
            console.log("closed sse connection");
        }
    }, false);

    source.addEventListener('message', function (e) {

        console.log("received sse");
        console.log(data);
        // var data = JSON.parse(e.data);
        // console.log(data.id, data.msg);
    }, false);

    source.addEventListener('cohortMessage', function (e) {

        console.log("received SSE");
        console.log(e);
        //COLLECTING JSON DATA AND READING ACTION
        var data = JSON.parse(e.data);
        console.log("SSE data: " + data);

        var x = data.action;
        var actionAsArray = data.action.split("-");
        var cue =
        {
            type: actionAsArray[0],
            index: parseInt(actionAsArray[1], 10),
            action: actionAsArray[2]
        }

        // make sure our index is a valid integer
        if(isNaN(cue.index)){
            console.log("could not parse cue due to invalid index: " + actionAsArray[1]);
            cue = nil;
        } else {
            console.log("parsed cue: " + cue);
        }

        //IF WE SEND {"action": "episode-X-load"} change value of index accordingly
        if(cue){
            if(cue.type === "episode"){

                // check if index is in bounds
                if(cue.index < numberOfEpisodes){
                    switch(cue.action){


                        case "load":  if(audioIsPlaying === false ){
                            Index = cue.index;
                            info.innerHTML = "<h4>Please tap the button below to confirm you're ready!</h4>"
                            $('#episode-confirm').css('display', 'block');
                            console.log("episode number: " + Index);
                          }
                            break;

                        case "go":
                            console.log("starting episode " + cue.index + " in 5 seconds");
                            info.innerHTML = "<h4>" + episodes[Index].displayName + "</h4>";
                            setTimeout(function () {
                                if (!audioIsPlaying) {
                                    audioIsPlaying = true;
                                    if (participantGroup === GroupEnum.BLUE) {
                                        //NOT SURE IF THE "currentEpisodeAudio" IS NECCESSARY BUT IT WAS MY WAY OF REDUCING FOR LOOPS
                                        switch (cue.index) {
                                            case 0:
                                                test.play();
                                                currentEpisodeAudio = test;
                                                break;

                                            case 1:
                                                simpleFluxB.play();
                                                currentEpisodeAudio = simpleFluxB;
                                                break;

                                            case 2:
                                                cornersB.play();
                                                currentEpisodeAudio = cornersB;
                                                break;

                                            case 3:
                                                chipmeltB.play();
                                                currentEpisodeAudio = chipmeltB;
                                                break;

                                            case 4:
                                                shipB.play();
                                                currentEpisodeAudio = shipB;
                                                break;

                                            case 5:
                                                hulaB.play();
                                                currentEpisodeAudio = hulaB;
                                                break;

                                            case 6:
                                                orbitalsB.play();
                                                currentEpisodeAudio = orbitalsB;
                                                break;

                                            default:
                                                console.log("no music for cue index " + cue.index);
                                        }
                                    } else if(participantGroup === GroupEnum.RED){
                                        switch (cue.index) {
                                            case 0:
                                                test.play();
                                                currentEpisodeAudio = test;
                                                break;

                                            case 1:
                                                simpleFluxR.play();
                                                currentEpisodeAudio = simpleFluxR;
                                                break;

                                            case 2:
                                                cornersR.play();
                                                currentEpisodeAudio = cornersR;
                                                break;

                                            case 3:
                                                chipmeltR.play();
                                                currentEpisodeAudio = chipmeltR;
                                                break;

                                            case 4:
                                                shipR.play();
                                                currentEpisodeAudio = shipR;
                                                break;

                                            case 5:
                                                hulaR.play();
                                                currentEpisodeAudio = hulaR;
                                                break;

                                            case 6:
                                                orbitalsR.play();
                                                currentEpisodeAudio = orbitalsR;
                                                break;

                                            default:
                                                console.log("no music for cue index " + cue.index);
                                        }
                                    } else {
                                        console.log("participant has no group assigned");
                                    }
                                }
                            //END OF DELAY SET UP..SET TO 5s
                            }, 5000);
                            break;

                        case "pause":
                            currentEpisodeAudio.pause();
                            audioIsPlaying = false;
                            console.log('paused');
                            break;

                        case "stop":
                            if (currentEpisodeAudio.duration > 0 && !currentEpisodeAudio.paused) {
                                currentEpisodeAudio.pause();
                                currentEpisodeAudio.currentTime = 0;
                            }
                            //THIS WAS MY ATTEMPT AT GETTING RID OF SOME STUFF FROM THE DOM..DON'T THINK IT HELPED AND IS NOW PROBABLY NOT NECCESSARY..UNLESS
                            //SOMEONE STAYS ALL NIGHT AND REFUSES TO REFRESH THEIR BROWSER
                            $('audio').remove();
                            audioIsPlaying = false;
                            break;

                        default:
                            console.log("invalid cue action: " + cue.action);
                    }
                } else {
                    console.log("there is no episode for that number");
                }

            }
        }
    }, false);
}

//LISTEN FOR WHEN AUDIO HAS ENDED AND UPDATE UI....I TRIED DOING THIS WITHOUT PLACING A FUNCTION INSIDE A FOR LOOP BUT..
for (var i = 0; i < allAudio.length; i++) {

    allAudio[i].addEventListener("ended", function () {
        audioIsPlaying = false;
        console.log("ended");
        $("audio").remove();
        info.innerHTML = "<h4>If you'd like to stay for another episode, please wait.</h4><h4>If not, thank you for playing <i>FluxDelux</i>! You can now check out and make your way to the exit.";
        $('#check-out').css('display', 'block');
    }, false);


}


// MOST AGREE THIS IS A BETTER WAY, BUT STILL NOT GREAT WAY OF PUTTING AN EVENTLISTENER ON AN ARRAY

for (var p = 0; p < allAudio.length; p++) {
    (function (p) {
        allAudio[p].addEventListener("play", function () {

            info.innerHTML = "<h4>" + episodes[Index].displayName + "</h4>";
            // b1.style.visibility = "hidden";

        }, false);
    })(p);

}

//THIS IS IN CASE THE AUDIO WAS WAITING..WHICH INDICATES THAT THE VIDEO IS NOT LOADED BUT MAY LOAD IN THE FUTUR..IT MAY ALSO NOT.
for (var q = 0; q < allAudio.length; q++) {
    (function (q) {
        allAudio[q].addEventListener("waiting", function () {

            // info.innerHTML = "<h4>Audio instructions are delayed</h4>";
            console.log("stalled");

        }, false);
    })(q);

}

//CHECK-IN FUNCTION

$("#episode-confirm").on("click", function () {
    info.innerHTML = "<h4>Please put on your headphones and wait for audio instructions.</h4>";
    $(this).css('display', 'none');
});


//GROUP() ASSIGNS A PERSON TO BE EITHER RED OR BLUE
function assignGroup() {
    var ranNum = Math.random() * (2 - 1) + 1;

    if (ranNum > 1.5) {
        return 2;
    } else {
        return 1;
    }
}

// function loadScores(){
//   simpleFluxB.load();
//   cornersB.load();
//   chipmeltB.load();
//   shipB.load();
//   hulaB.load();
//   orbitalsB.load();
// }

$("#b5").on("click", function(){


  simpleFluxB.play();
  manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Audio now streaming</h2>";

playerLayer.style.visibility = "visible";

})
$("#b6").on("click", function(){


  cornersB.play();
  manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Audio now streaming</h2>";

playerLayer.style.visibility = "visible";
})
$("#b7").on("click", function(){


  chipmeltB.play();
  manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Audio now streaming</h2>";

  playerLayer.style.visibility = "visible";
})
$("#b8").on("click", function(){


  shipB.play();
  manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Audio now streaming</h2>";

  playerLayer.style.visibility = "visible";
})
$("#b9").on("click", function(){


  hulaB.play();
  manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Audio now streaming</h2>";

  playerLayer.style.visibility = "visible";
})
$("#b10").on("click", function(){


  orbitalsB.play();
  manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Audio now streaming</h2>";

  playerLayer.style.visibility = "visible";
})
