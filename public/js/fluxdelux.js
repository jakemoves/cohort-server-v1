
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
//INDEX SETS UP
var Index;


var info = document.getElementById("info");
var b1 = document.getElementById("b1");
var playerLayer = document.getElementById("playerLayer");


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

// var Corners = [cornersB, cornersR];
// var Chipmelt = [chipmeltB, chipmeltR];
// var Hula = [hulaB, hulaR];
// var Ship = [shipB, shipR];
// var Orbitals = [orbitalsB, orbitalsR];

var allAudio = [simple, cornersB, cornersR, chipmeltB, chipmeltR, hulaB, hulaR, shipB, shipB, orbitalsB, orbitalsR];

//--setting up boolean to only have one audio playback at a time
var tf = false;

// var load = function(){
//   for(var i =0; i< allAudio.length; i++){
//   allAudio[i].load();
// }
//   console.log("audio loaded");
// };
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

    info.innerHTML = "Fantastic, you are now in queue. Please put your headphones on and wait for audio instructions.";
    b1.innerHTML = "Checked-in!";
};


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
    // audio.play();
    console.log("received sse");
    console.log(data);
    // var data = JSON.parse(e.data);
    // console.log(data.id, data.msg);
}, false);

source.addEventListener('cohortMessage', function (e) {

    //if tf is still false, play audio

    console.log("received SSE");
    console.log(e);
    var data = JSON.parse(e.data);
    console.log(data.id, data.msg);

    var x = data.action;

    function buttonVisible() {
        b1.style.visibility = "visible";
    }

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

    setTimeout(function () {
        if (tf === false) {

            tf = true;

            if (redblue === 1) {

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
                        break;

                    case "episode-4-go":
                        shipB.play();
                        break;

                    case "episode-5-go":
                        hulaB.play();
                        break;

                    case "episode-6-go":
                        orbitalsB.play();
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
                        break;

                    case "episode-4-go":
                        shipR.play();
                        break;

                    case "episode-5-go":
                        hulaR.play();
                        break;

                    case "episode-6-go":
                        orbitalsR.play();
                        break;


                    default:
                        console.log("no music");
                }


            }

        }


        if (x === "pause") {
            // for(var i =0; i < allAudio.length; i ++){
            //   allAudio[i].pause();
            //   tf=false;
            Me.pause();
            console.log('paused');

            // }

        }

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
            $('audio').remove();

            tf = false;

            // }
        }



    }, 5000);





}, false);
//---returns tf = false when audio has finished. Loops through an array of all the audios

// var load = function(){
//   switch(Index){
//     case 0: simple.load();
//     break;
//
//     case 1: cornersB.load();
//               cornersR.load();
//
//     break;
//
//     case 2: chipmeltB.load();
//               chipmeltR.load();
//     break;
//
//     case 3: shipB.load();
//               shipR.load();
//     break;
//
//     case 4: hulaB.load();
//               hulaR.load();
//     break;
//
//     case 5: orbitalsB.load();
//               orbitalsR.load();
//     break;
//
//     default: console.log("no load")
//   }
//
//   console.log("audio loaded");
//
//   info.innerHTML ="Fantastic, you are now in queue. Please put your headphones on and wait for audio instructions."
//   b1.innerHTML = "Checked-in!"
// }


// Me.addEventListener("ended", function(){
//       tf=false;
//       console.log("ended");
//       $("audio").remove();
//       info.innerHTML = "If you'd like to stay for another score, please wait. If not, thank you for playing FluxDelux, you can now make your way to the exit";
//     }, false);

//LISTEN FOR WHEN AUDIO HAS ENDED AND UPDATE UI
for (var i = 0; i < allAudio.length; i++) {

    allAudio[i].addEventListener("ended", function () {
        tf = false;
        console.log("ended");
        $("audio").remove();
        info.innerHTML = "If you'd like to stay for another score, please wait. If not, thank you for playing FluxDelux, you can now make your way to the exit";

    }, false);


}


// MOST AGREE THIS IS A BETTER WAY, BUT STILL NOT GREAT WAY OF PUTTING AN EVENTLISTENER ON AN ARRAY

for (var p = 0; p < allAudio.length; p++) {
    (function (p) {
        allAudio[p].addEventListener("play", function () {

            info.innerHTML = "Audio instructions are now streaming";
            b1.style.visibility = "hidden";

        }, false);
    })(p);

}

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

    b1.innerHTML = "You are now checked-in!";

    playerLayer.style.visibility = "visible";

});





$("#b1").click(function () {
    info.innerHTML = "Fantastic, you are now in queue. Please put on your headphones and wait for audio instructions.";

    b1.innerHTML = "You are now checked-in!";

    playerLayer.style.visibility = "visible";

});
