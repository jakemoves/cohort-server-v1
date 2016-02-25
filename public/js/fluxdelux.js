       var currentDate = new Date();
       var currentTime;
       var checkinTime = false;

       //self updating time that converts current time 
       function updatingTime() {
           var hours = currentDate.getHours();
           var minutes = currentDate.getMinutes();
           var seconds = currentDate.getSeconds();
           if (minutes < 10)
               minutes = "0" + minutes

//           var suffix = "AM";
//           if (hours >= 12) {
//               suffix = "PM";
//               hours = hours - 12;
//           }
//           if (hours == 0) {
//               hours = 12;
//           }

           currentTime = hours + ":" + minutes + " " ;
               //+ suffix;

       }
       updatingTime();
       setInterval(updatingTime, 60000);
      




       $(document).ready(function () {
           if (Cookies.get('fluxdelux') == "checkedin") {
               $('#passcode').val('YOW');
           };

           // get list of upcoming events from server
           var events =
               // for broken Node 
//               $.get("http://fluxdelux.org/events/upcoming")
//                for production
               $.get("events/upcoming")
               .done(function (data) {
                   //console.log(data);
               })
               .fail(function () {
                   console.log("Request failed: /events/upcoming");
               });

           events.then(function (events) {


               console.log(events);
               var eventsList = $('<ul>').addClass('events-list').appendTo('#info');
               for (i = 0; i < events.length; i++) {
                   var date = moment(events[i].date + ", " + events[i].startTime, "MMMM D, YYYY, h:mm A");
                  


                   //---date condition for checkin --time is not included
                   var dateForCheckin = new Date(Date.parse(events[i].date));
                   var checkinTime;
                   
                   var checkindate= Date.parse(events[0].date);
                   console.log(checkindate);
                
                   if (currentTime == events[i].doorsOpenTime) {
                       checkinTime = true;
                   } else if (currentTime == events[i].endTime) {
                       checkinTime = false;
                   };



                   if ((currentDate.getDate() == dateForCheckin.getDate()) && (currentDate.getMonth() == dateForCheckin.getMonth()) && ((currentDate.getFullYear() +1) == dateForCheckin.getFullYear()) && (checkinTime == true)) {
                       var buttonHTML = '<button class="btn btn-success btn-block" onclick="checkinManually()">Check In </button>';
                       $("#backup").css("display", "block");
                   } else {
                       var buttonHTML = '<a href="' + events[i].signupURL + '" class= "btn btn-warning" role="button" title="link to event page">Sign Up</a>';
                   };

                   var eventDate = date.format("dddd, MMMM Do, h:mm") + ' – ' + events[i].endTime;
                   var eventHTML = '<li class=" event jumbotron">' + '<h4 class="city" style="text-align: left">' + events[i].city + '</h4>' + '<p><strong>' + events[i].venue + '</strong><br/>' + events[i].address + '</p>' + '<p><strong>' + eventDate + '</strong><br> Doors open at ' + events[i].doorsOpenTime + '</p>' + buttonHTML + '</li>';
                   $('.events-list').append($(eventHTML));


               };






           });

       });

       var GroupEnum = {
           BLUE: 1,
           RED: 2
               /*,
                   properties: {
                       1: {name: "blue", value: 1},
                       2: {name: "red", value: 2}
                   }*/
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
               "name": "ship",
               "displayName": "Ship"

    },
           {
               "name": "chipmelt",
               "displayName": "Chip Melt"
    },
           {
               "name": "orbitals",
               "displayName": "Orbitals"
    },
           {
               "name": "hulalasso",
               "displayName": "Hula Lasso"
    },
           {
               "name": "shipTogether",
               "displayName": "Ship Together"
    },
           {
               "name": "chipMeltTogether",
               "displayName": "Chip Melt Together"
    }
];

       var numberOfEpisodes = episodes.length;
       var source;

       var participantGroup = assignGroup();
       //console.log("participantGroup: " + GroupEnum.properties[participantGroup].name);

       var participantIsCheckedIn = false;

       var currentEpisodeAudio;
       var Index;

       var playerLayer = document.getElementById('playerLayer');
       var manual = document.getElementById('manual');
       var pageTwo = document.getElementById("page02");
       var info = document.getElementById("info");
       var b1 = document.getElementById("b1");


       //LOADING ALL THE AUDIO ELEMENTS
       //IF AUDIO SOURCES NEED TO CHANNGE, UPDATE EACH trackname.src = "https://newSource..."
       var test = document.createElement('audio');
       test.src = 'https://s3.amazonaws.com/fluxdelux.org/test.mp3';
       test.preload = "none";

       var simpleFluxB = document.createElement('audio');
       simpleFluxB.src = 'https://s3.amazonaws.com/fluxdelux.org/simpleflux.mp3';
       simpleFluxB.preload = "none";
       var simpleFluxR = document.createElement('audio');
       simpleFluxR.src = 'https://s3.amazonaws.com/fluxdelux.org/simpleflux.mp3';
       simpleFluxR.preload = "none";

       var cornersB = document.createElement('audio');
       cornersB.src = 'https://s3.amazonaws.com/fluxdelux.org/corners-blue.mp3';
       cornersB.preload = "none";
       var cornersR = document.createElement('audio');
       cornersR.src = 'https://s3.amazonaws.com/fluxdelux.org/corners-red.mp3';
       cornersR.preload = "none";

       var chipmeltB = document.createElement('audio');
       chipmeltB.src = 'https://s3.amazonaws.com/fluxdelux.org/chip-melt-blue.mp3';
       chipmeltB.preload = "none";
       var chipmeltR = document.createElement('audio');
       chipmeltR.src = 'https://s3.amazonaws.com/fluxdelux.org/chip-melt-red.mp3';
       chipmeltR.preload = "none";

       var hulaB = document.createElement('audio');
       hulaB.src = 'https://s3.amazonaws.com/fluxdelux.org/hula-lasso-blue.mp3';
       hulaB.preload = "none";
       var hulaR = document.createElement('audio');
       hulaR.src = 'https://s3.amazonaws.com/fluxdelux.org/hula-lasso-red.mp3';
       hulaR.preload = "none";

       var shipB = document.createElement('audio');
       shipB.src = 'https://s3.amazonaws.com/fluxdelux.org/ship-blue.mp3';
       shipB.preload = "none";
       var shipR = document.createElement('audio');
       shipR.src = 'https://s3.amazonaws.com/fluxdelux.org/ship-red.mp3';
       shipR.preload = "none";

       var orbitalsB = document.createElement('audio');
       orbitalsB.src = 'https://s3.amazonaws.com/fluxdelux.org/orbitals-blue.mp3';
       orbitalsB.preload = "none";
       var orbitalsR = document.createElement('audio');
       orbitalsR.src = 'https://s3.amazonaws.com/fluxdelux.org/orbitals-red.mp3';
       orbitalsR.preload = "none";

       var chipMeltTogetherB = document.createElement('audio');
       chipMeltTogetherB.src = 'https://s3.amazonaws.com/fluxdelux.org/chip-melt-together.mp3';
       chipMeltTogetherB.preload = "none";
       var chipMeltTogetherR = document.createElement('audio');
       chipMeltTogetherR.src = 'https://s3.amazonaws.com/fluxdelux.org/chip-melt-together.mp3';
       chipMeltTogetherR.preload = "none";

       var shipTogetherB = document.createElement('audio');
       shipTogetherB.src = 'https://s3.amazonaws.com/fluxdelux.org/ship-together.mp3';
       shipTogetherB.preload = "none";
       var shipTogetherR = document.createElement('audio');
       shipTogetherR.src = 'https://s3.amazonaws.com/fluxdelux.org/ship-together.mp3';
       shipTogetherR.preload = "none";

       //SETTING UP ARRAY OF ALL THE AUDIO FILES FOR FUTUR FOR LOOPS

       var allAudio = [test, simpleFluxB, simpleFluxR, cornersB, cornersR, chipmeltB, chipmeltR, hulaB, hulaR, shipB, shipB, orbitalsB, orbitalsR, chipMeltTogetherB, chipMeltTogetherR, shipTogetherB, shipTogetherR];

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
               shipB.load();
               shipR.load();
               break;

           case 4:
               chipmeltB.load();
               chipmeltR.load();
               break;

           case 5:
               orbitalsB.load();
               orbitalsR.load();
               break;

           case 6:
               hulaB.load();
               hulaR.load();
               break;

           case 7:
               shipTogetherB.load();
               shipTogetherR.load();
               break;

           case 8:
               chipMeltTogetherB.load();
               chipMeltTogetherR.load();
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

       var checkinManually = function () {
           var passcode = $('#passcode').val();
           if (passcode === "YOW") {
               Cookies.set('fluxdelux', 'checkedin', {
                   expires: 7
               });
               checkin();
           } else if (passcode === "backup") {
               console.log("go");
               pageTwo.style.visibility = "visible";
           } else {
               $('#passcode').attr('placeholder', 'Incorrect passcode');
           }
       };

       var backupCheckin = function () {
           $("#page02").css("display", "block");

       }

       var checkin = function () {
           subscribeToServerSentEvents();
           participantIsCheckedIn = true;
           info.innerHTML = "<h4>When the next episode starts in a few minutes, we’ll loop you in. Until then:</h4><ul><li>move into the open space along a curving path</li><li>be careful not to bump or brush against anyone else</li><li>vary your speed whenever you want</li><li>pause and be still whenever the impulse strikes you</li><li>follow beside or behind others when you want</li><li>copy, repeat, and experiment with movements that you see around you, whenever you want</li></ul>";
           $('#check-in').css('display', 'none');
       };

       var checkout = function () {
           source.close();
           info.innerHTML = "<h4>Welcome to <i>FluxDelux</i>!</h4><h4>If you’re in our space at the <a href=\"https%3A//www.google.ca/maps/place/Carleton+University+Conference+Services/@45.3871615%2C-75.699481%2C17z/data%3D%213m1%214b1%214m2%213m1%211s0x4cce05d910840183%3A0x5df37779017e6a0a\">Carleton University Residence Commons Conference Centre</a>, enter the check-in passcode.</h4>";
           $('#check-out').css('display', 'none');
           $('#survey').css('display', 'block');
           $('#check-in').css('display', 'block');
       };

       var subscribeToServerSentEvents = function () {

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
               var cue = {
                   type: actionAsArray[0],
                   index: parseInt(actionAsArray[1], 10),
                   action: actionAsArray[2]
               };

               // make sure our index is a valid integer
               if (isNaN(cue.index)) {
                   console.log("could not parse cue due to invalid index: " + actionAsArray[1]);
                   cue = nil;
               } else {
                   console.log("parsed cue: " + cue);
               }

               //IF WE SEND {"action": "episode-X-load"} change value of index accordingly
               if (cue) {
                   if (cue.type === "episode") {

                       // check if index is in bounds
                       if (cue.index < numberOfEpisodes) {
                           switch (cue.action) {


                           case "load":
                               if (audioIsPlaying === false) {
                                   Index = cue.index;
                                   info.innerHTML = "<h4>Please tap the button below to allow audio playback</h4>";
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
                                               shipB.play();
                                               currentEpisodeAudio = shipB;

                                               break;

                                           case 4:
                                               chipmeltB.play();
                                               currentEpisodeAudio = chipmeltB;

                                               break;

                                           case 5:
                                               orbitalsB.play();
                                               currentEpisodeAudio = orbitalsB;

                                               break;

                                           case 6:
                                               hulaB.play();
                                               currentEpisodeAudio = hulaB;
                                               break;

                                           case 7:
                                               shipTogetherB.play();
                                               currentEpisodeAudio = shipTogetherB;
                                               break;

                                           case 8:
                                               chipMeltTogetherB.play();
                                               currentEpisodeAudio = chipMeltTogetherB;
                                               break;


                                           default:
                                               console.log("no music for cue index " + cue.index);
                                           }
                                       } else if (participantGroup === GroupEnum.RED) {
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
                                               shipR.play();
                                               currentEpisodeAudio = shipR;

                                               break;

                                           case 4:
                                               chipmeltR.play();
                                               currentEpisodeAudio = chipmeltR;

                                               break;

                                           case 5:
                                               orbitalsR.play();
                                               currentEpisodeAudio = orbitalsR;

                                               break;

                                           case 6:
                                               hulaR.play();
                                               currentEpisodeAudio = hulaR;

                                               break;

                                           case 7:
                                               shipTogetherR.play();
                                               currentEpisodeAudio = shipTogetherR;

                                               break;

                                           case 8:
                                               shipTogetherB.play();
                                               currentEpisodeAudio = shipTogetherB;
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
       };

       //LISTEN FOR WHEN AUDIO HAS ENDED AND UPDATE UI
       for (var i = 0; i < allAudio.length; i++) {

           allAudio[i].addEventListener("ended", function () {
               audioIsPlaying = false;
               console.log("ended");
               $("audio").remove();
               info.innerHTML = "<h4>If you'd like to stay for another episode, please wait.</h4><h4>If not, thank you for playing <i>FluxDelux</i>! You can now check out and make your way to the exit.";
               $('#check-out').css('display', 'block');
           }, false);


       }




       for (var p = 0; p < allAudio.length; p++) {
           (function (p) {
               allAudio[p].addEventListener("play", function () {

                   info.innerHTML = "<h4>" + episodes[Index].displayName + "</h4>";


               }, false);
           })(p);

       }

       ////THIS IS IN CASE THE AUDIO WAS WAITING..WHICH INDICATES THAT THE Audio IS NOT LOADED BUT MAY LOAD IN THE FUTURE..IT MAY ALSO NOT.
       //for (var q = 0; q < allAudio.length; q++) {
       //    (function (q) {
       //        allAudio[q].addEventListener("waiting", function () {
       //
       //            info.innerHTML = "<h4>We can't seem to start our audio on your smartphone. Please see a volunteer for help.</h4>";
       //            console.log("stalled");
       //
       //        }, false);
       //    })(q);
       //
       //}

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




       function manualGo() {
           var dropDownChoice = $("#manualEpisodeChoice").val();


           switch (dropDownChoice) {
           case "0":
               simpleFluxB.play();
               manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Simple Flux now streaming</h2>";
               playerLayer.style.visibility = "visible";

               break;
           case "1":
               cornersB.play();
               manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Corners now streaming</h2>";
               playerLayer.style.visibility = "visible";

               break;
           case "2":
               shipB.play();
               manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Ship now streaming</h2>";
               playerLayer.style.visibility = "visible";

               break;
           case "3":
               chipmeltB.play();
               manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Chip Melt now streaming</h2>";
               playerLayer.style.visibility = "visible";

               break;
           case "4":
               hulaB.play();
               manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Hula Lasso now streaming</h2>";
               playerLayer.style.visibility = "visible";
               break;
           case "5":
               orbitalsB.play();
               manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Orbitals now streaming</h2>";
               playerLayer.style.visibility = "visible";

               break;
           case "6":
               shipTogetherB.play();
               manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Ship Together now streaming</h2>";
               playerLayer.style.visibility = "visible";

               break;
           case "7":
               chipMeltTogetherB.play();
               manual.innerHTML = "<h2 style = 'color: white; text-align: center'> Chip Melt Together now streaming</h2>";
               playerLayer.style.visibility = "visible";

               break;
           default:
               console.log(dropDownChoice);;
           }
       }