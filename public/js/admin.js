
//---id array
var eventsId =[];


//disable Enter key
$('form').bind('keydown', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});
$("#formButton").click(function (event) {
    event.preventDefault();
});

//function for when submit create event is hit
function formSubmit() {

    //console.log('preparing form data');
    var flux = {
            "city": $("#city").val(),
            "venue": $("#venue").val(),
            "address": $("#address").val(),
            "geocode": [
         $("#geocodeLatitude").val(), $("#geocodeLongitude").val()
        ],
            "date": $("#date").val(),
            "doorsOpenTime": $("#doorsOpenTime").val(),
            "startTime": $("#startTime").val(),
            "endTime": $("#endTime").val(),
            "hosts": [{
                "name": $("#hostName").val(),
                "url": $("#hostURL").val()
        }],
            "signupURL": $("#signupURL").val(),
            "checkInCode": $("#checkInCode").val()
        }
        //console.log(JSON.stringify(flux));

    $.ajax({
        type: "POST",
        // for busted node install
        url: "http://fluxdelux.org/events/create",
        // for production
        //url: "events/create",
        data: flux,
        success: function (data) {
            alert("Event Created")
            console.log("post request successful");
            console.log(data);
        },
        error: function (data) {
            alert("An error has occured, please review creation form");
            console.log('error: ');
            console.log(data);
        }
    });
};

$(document).ready(function () {
    //to be changed to /events
    var events = $.get("http://fluxdelux.org/events")
        .done(function (data) {
        //console.log(data);
        })
        .fail(function () {
        console.log("Request failed: /events");
        });

        events.then(function (events) {
            
            for (i = 0; i <= events.length; i++) {
                var eventHTML = '<option value ="' + i + '">' + events[i].city + ', ' + events[i].venue + ', ' + events[i].date + '</option>';
                $('#deleteEvent').append($(eventHTML));
                
                eventsId.push(events[i]._id);
            }
        });
   
});


function removeEvent(){
    id = eventsId[$("#deleteEvent").val()];
    
    
   
    
     $.ajax({
        type: "POST",
        // for busted node install
        url: "http://fluxdelux.org/events/create/delete",
        // for production
        //url: "events/create/delete",
        data: {"eventID: id"},
        success: function (data) {
            alert("Event successfully deleted");
            console.log("post request successful");
            console.log(data);
        },
        error: function (data) {
            alert("An error has occured");
            console.log('error: ');
            console.log(data);
        }
    });
    
    //ALTERNATIVE
//    var removeEvent = $.post("http://fluxdelux.org/events/delete", {"eventId": id} )
//        .done(function (data) {
//        //console.log(data);
//        })
//        .fail(function () {
//        console.log("Request failed: /events/delete");
//        });
//    
    
};
        
            
        
                     