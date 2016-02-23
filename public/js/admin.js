//---id array
var eventsId =[];

// CORS 
//var baseUrl = "http://fluxdelux.org/";
// Production
var baseUrl = "";

$(document).ready(function () {
    updateEventList();
});

//disable Enter key
$('form').bind('keydown', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});

//function for when submit create event is hit
function formSubmit(e) {
    e.preventDefault();

    //console.log('preparing form data');
    var flux = {
        city: $("#city").val(),
        venue: $("#venue").val(),
        address: $("#address").val(),
        geocode: [
            $("#geocodeLatitude").val(), $("#geocodeLongitude").val()
        ],
        date: $("#date").val(),
        doorsOpenTime: $("#doorsOpenTime").val(),
        startTime: $("#startTime").val(),
        endTime: $("#endTime").val(),
        hosts: [{
            name: $("#hostName").val(),
            url: $("#hostURL").val()
        }],
        signupURL: $("#signupURL").val(),
        checkInCode: $("#checkInCode").val()
    }

    console.log(flux);

    var serverUrl = baseUrl + "events/create";

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: serverUrl,
        data: JSON.stringify(flux),
        success: function (data) {
            alert("Event Created")
            console.log("post request successful");
            console.log(data);
            updateEventList();
        },
        error: function (data) {
            alert("An error has occured, please review creation form");
            console.log('error: ');
            console.log(data);
        }
    });
};


function removeEvent(e){
    e.preventDefault();

    id = eventsId[$("#deleteEvent").val()];
    var requestBody = { eventId: id };
    console.log(requestBody);

    var serverUrl = baseUrl + "events/delete";
    
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: serverUrl,
        data: JSON.stringify(requestBody),
        success: function (data) {
            //alert("Event successfully deleted");
            console.log("post request successful");
            console.log(data);
            updateEventList();
        },
        error: function (data) {
            //alert("An error has occured");
            console.log('error: ');
            console.log(data);
        }
    });  
};
     
function updateEventList(){
    var serverUrl = baseUrl + "events";
    var events = $.get(serverUrl)
        .done(function (data) {
            //console.log(data);
        })
        .fail(function () {
            console.log("Request failed: /events");
        });

    events.then(function (events) {
        // clear existing options, if any
        $('#deleteEvent').find('option').remove();

        for (i = 0; i < events.length; i++) {
            var evnt = events[i];
            var eventHTML = '<option value ="' + i + '">' + evnt.city + ', ' + evnt.venue + ', ' + evnt.date + '</option>';
            $('#deleteEvent').append($(eventHTML));
            
            eventsId.push(evnt._id);
        }
    });
}   
            
        
                     