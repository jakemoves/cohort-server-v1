//---id array
var eventsId =[];


// CORS 
//var baseUrl = "http://dev.fluxdelux.org/";
// Production
var baseUrl = "";

$(document).ready(function () {
    updateEventList();
});





var doorsTimeInString= $("#doorsOpenTime").val()
//disable Enter key
$('form').bind('keydown', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});

//function for when submit create event is hit
function formSubmit(e) {
    e.preventDefault();
function convert(input) {
    return moment(input, 'HH:mm').format('h:mm A');
}
    doorsOpenTimeFormated = convert($("#doorsOpenTime").val());
    startTimeFormated = convert($("#startTime").val());
    endTimeFormated = convert($("#endTime").val());
    console.log(endTimeFormated);
    var flux = {
        city: $("#city").val(),
        venue: $("#venue").val(),
        address: $("#address").val(),
        geocode: [
            $("#geocodeLatitude").val(), $("#geocodeLongitude").val()
        ],
        date: $("#date").val(),
        doorsOpenTime: doorsOpenTimeFormated,
        startTime: startTimeFormated,
        endTime: endTimeFormated,
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
            $(".modal-body").html("<h5 style='text-align:center'><font color='#1b4790'>Event created!</font></h5>");
            console.log("post request successful");
            console.log(data);
            updateEventList();
        },
        error: function (data) {
            $(".modal-body").html("<h5 style='text-align:center'><font color='#1b4790'>There seems to be a problem. Please double check the form and give it another go.</font></h5>");
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
            console.log("post request successful");
            console.log(data);
            updateEventList();
        },
        error: function (data) {
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
            
        
                     