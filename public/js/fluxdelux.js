
//GROUP() ASSIGNS A PERSON TO BE EITHER RED OR BLUE
function group() {
    var ranNum = Math.random() * (2 - 1) + 1;

    if (ranNum > 1.5) {
        return 2;
    } else {
        return 1;
    }
}
var redblue = group();
console.log(redblue);

//ME SETS UP THE STOP AND PAUSE
var Me;
//INDEX CAPTURES THE "PRELOAD" SSE NUMBER
var Index;


var info = document.getElementById("info");
var b1 = document.getElementById("b1");
// var playerLayer = document.getElementById("playerLayer");

//LOADING ALL THE AUDIO ELEMENTS
//SIMPLEFLUX IS REPLACED WITH A SHORT TEST.MP3 THATS ONLY 30s LONG
var simple = document.createElement('audio');
simple.src = 'https://s3.amazonaws.com/fluxdelux.org/test.mp3';
simple.preload = "none";

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

var allAudio = [simple, cornersB, cornersR, chipmeltB, chipmeltR, hulaB, hulaR, shipB, shipB, orbitalsB, orbitalsR];

//--setting up boolean to only have one audio playback at a time
var tf = false;

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
            simple.load();
            break;

        case 1:
            cornersB.load();
            cornersR.load();

            break;

        case 2:
            chipmeltB.load();
            chipmeltR.load();
            break;

        case 3:
            shipB.load();
            shipR.load();
            break;

        case 4:
            hulaB.load();
            hulaR.load();
            break;

        case 5:
            orbitalsB.load();
            orbitalsR.load();
            break;

        default:
            console.log("no load");
    }

    console.log("audio loaded");
//CHANGE UI AFTER USER CHECKS IN
    info.innerHTML = "Fantastic, you are now in queue. Please put your headphones on and wait for audio instructions.";
    //I NOW HAVE THE BUTTON HIDING SO THAT USERS DON'T KEEP PRESSING IT AND LOADING THE AUDIO AGAIN AND AGAIN.
    // b1.innerHTML = "Checked-in!";
};

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

    //if tf is still false, play audio

    console.log("received SSE");
    console.log(e);
    //COLLECTING JSON DATA AND READING ACTION
    var data = JSON.parse(e.data);
    console.log(data.id, data.msg);

    var x = data.action;

//SETTING UP A FUNCTION TO MAKE BUTTON VISIBLE WHEN RECIEVING A PRELOAD SSE
    function buttonVisible() {
        b1.style.visibility = "visible";
    }
//IF WE SEND {"action": "x"} change value of index accordingly
    switch (x) {
        case "0":
            buttonVisible();
            Index = 0;
            return Index;


        case "1":
            buttonVisible();
            Index = 1;
            return Index;


        case "2":
            buttonVisible();
            Index = 2;
            return Index;

        case "3":
            buttonVisible();
            Index = 3;
            return Index;

        case "4":
            buttonVisible();
            Index = 4;
            return Index;

        case "5":
            buttonVisible();
            Index = 5;
            return Index;

        default:
            console.log('no Index');
    }
//SETTING UP DELAY, AND THEN BOOLEAN TO MAKE SURE ONLY ONE FILE PLAYS
    setTimeout(function () {
        if (tf === false) {

            tf = true;

            if (redblue === 1) {
//NOT SURE IF THE "Me" IS NECCESSARY BUT IT WAS MY WAY OF REDUCING FOR LOOPS
                switch (x) {
                    case "episode-1-go":
                        simple.play();
                        Me = simple;
                        break;

                    case "episode-2-go":
                        cornersB.play();
                        Me = cornersB;
                        break;

                    case "episode-3-go":
                        chipmeltB.play();
                        Me = chipmeltB;
                        break;

                    case "episode-4-go":
                        shipB.play();
                        Me = shipB;
                        break;

                    case "episode-5-go":
                        hulaB.play();
                        Me = hulaB;
                        break;

                    case "episode-6-go":
                        orbitalsB.play();
                        Me = orbitalsB;
                        break;


                    default:
                        console.log("no music");
                }
            } else {
                switch (x) {
                    case "episode-1-go":
                        simple.play();
                        Me = simple;
                        break;

                    case "episode-2-go":
                        cornersR.play();
                        Me = cornersR;
                        break;

                    case "episode-3-go":
                        chipmeltR.play();
                        Me = chipmeltR;
                        break;

                    case "episode-4-go":
                        shipR.play();
                        Me = shipR;
                        break;

                    case "episode-5-go":
                        hulaR.play();
                        Me = hulaR;
                        break;

                    case "episode-6-go":
                        orbitalsR.play();
                        Me= orbitalsR;
                        break;


                    default:
                        console.log("no music");
                }


            }

        }

//HERE IS THE FOR LOOP "Me" GETS RID OF. THIS IS A PAUSE FEATURE
        if (x === "pause") {
            // for(var i =0; i < allAudio.length; i ++){
            //   allAudio[i].pause();
            //   tf=false;
            Me.pause();
            console.log('paused');

            // }

        }

//STOPS AUDIO AND RESETS AUDIO TO BEGINNING
        if (x === "stop") {
            // for(var p =0; p < allAudio.length; p ++){
            //   if(allAudio[p].duration > 0 && !allAudio[p].paused){
            //   allAudio[p].pause();
            //   allAudio[p].currentTime = 0;
            //   console.log('stopped');
            //   $("audio").remove();
            //
            // } else {
            // allAudio[p].currentTime = 0;
            // console.log('stopped');
            // $("audio").remove();
            // }
            if (Me.duration > 0 && !Me.paused) {
                Me.pause();
                Me.currentTime = 0;
            }
            //THIS WAS MY ATTEMPT AT GETTING RID OF SOME STUFF FROM THE DOM..DON'T THINK IT HELPED AND IS NOW PROBABLY NOT NECCESSARY..UNLESS
            //SOMEONE STAYS ALL NIGHT AND REFUSES TO REFRESH THEIR BROWSER
            $('audio').remove();

            tf = false;

            // }
        }


//END OF DELAY SET UP..SET TO 5s
    }, 5000);





}, false);



//LISTEN FOR WHEN AUDIO HAS ENDED AND UPDATE UI....I TRIED DOING THIS WITHOUT PLACING A FUNCTION INSIDE A FOR LOOP BUT..
for (var i = 0; i < allAudio.length; i++) {

    allAudio[i].addEventListener("ended", function () {
        tf = false;
        console.log("ended");
        $("audio").remove();
        info.innerHTML = "If you'd like to stay for another score, please wait to check-in again.<br> If not, thank you for playing <i>FluxDelux</i>, you can now close your browser and make your way to the exit.<br> Enjoy the rest of Nuit Blanche!";
b1.innerHTML = "Check-In"
    }, false);


}


// MOST AGREE THIS IS A BETTER WAY, BUT STILL NOT GREAT WAY OF PUTTING AN EVENTLISTENER ON AN ARRAY

for (var p = 0; p < allAudio.length; p++) {
    (function (p) {
        allAudio[p].addEventListener("play", function () {

            info.innerHTML = "Audio instructions are now streaming";
            // b1.style.visibility = "hidden";

        }, false);
    })(p);

}

//THIS IS IN CASE THE AUDIO WAS WAITING..WHICH INDICATES THAT THE VIDEO IS NOT LOADED BUT MAY LOAD IN THE FUTUR..IT MAY ALSO NOT.
for (var q = 0; q < allAudio.length; q++) {
    (function (q) {
        allAudio[q].addEventListener("waiting", function () {

            info.innerHTML = "Audio instructions are delayed";
            console.log("stalled");

        }, false);
    })(q);

}

//CHECK-IN FUNCTION

$("#b1").click(function () {
    info.innerHTML = "Fantastic, you are now in queue. Please put on your headphones and wait for audio instructions.";

    b1.style.visibility = "hidden";



});
