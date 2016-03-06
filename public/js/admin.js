//---id array
var eventsId = [];


// CORS 

//var baseUrl = "http://dev.fluxdelux.org/";

// Production
var baseUrl = "";

$(document).ready(function () {
    updateEventList();
});






var doorsTimeInString = $("#doorsOpenTime").val()
    //disable Enter key
$('form').bind('keydown', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});

//function for when submit create event is hit
function formSubmit(e) {
    e.preventDefault();

//    function convert(input) {
//        return input; //moment(input, 'HH:mm').format('h:mm A');
//    }
//    doorsOpenTimeFormated = convert($("#doorsOpenTime").val());
//    startTimeFormated = convert($("#startTime").val());
//    endTimeFormated = convert($("#endTime").val());

    doorsOpenTimeFormated = $("#doorsOpenTime").val(); + ":" + $("#doorsOpenTimeMin").val();
    startTimeFormated = $("#startTime").val() + ":" + $("#startTimeMin").val();
    endTimeFormated = $("#endTime").val() + ":" + $("#endTimeMin").val();
    
    dateFormated = $("#dateYear").val() + "-" + $("#dateMonth").val() + "-" + $("#dateDay").val();
    
     var flux = {
        city: $("#city").val(),
        venue: $("#venue").val(),
        address: $("#address").val(),
        geocode: [
            $("#geocodeLatitude").val(), $("#geocodeLongitude").val()
        ],
        date: dateFormated,
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


function removeEvent(e) {
    e.preventDefault();

    id = eventsId[$("#deleteEvent").val()];
    var requestBody = {
        eventId: id
    };
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

function updateEventList() {
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

function DynamicallyMakeTimeSlots(){
    var hourHTML;
    var minHTML;
    var yearHTML;
    var monthHTML;
    var dayHTML;
    
    for(i=0; i< 24; i++){
       if(i < 10){
            hourHTML +="<option value='0"+i+"'> 0" + i + ":" +"</option>";
        } else {
            hourHTML += "<option value='"+i+"'>" + i + ":" +"</option>";
        }
        $("#doorsOpenTime").html(hourHTML);
        $("#startTime").html(hourHTML);
        $("#endTime").html(hourHTML);
    }
    
    for(i=0;i<60;i+=5){
        if(i < 10){
            minHTML +="<option value='0"+i+"'>" +"0" + i +"</option>";   
        } else{
            minHTML +="<option value='"+i+"'>" + i +"</option>";
        }
        
        $("#doorsOpenTimeMin").html(minHTML);
        $("#startTimeMin").html(minHTML);
        $("#endTimeMin").html(minHTML);
    }
    
    for(i = 2016; i<=2030; i++){
        yearHTML += "<option value='"+i+"'>" + i + "</option>";
        $("#dateYear").html(yearHTML);
    }
        
    
    for(i= 1; i <= 12; i++){
        if(i < 10){
            monthHTML +="<option value='0"+i+"'> 0" + i +"</option>";
        } else{
            monthHTML +="<option value='"+i+"'>" + i +"</option>";       
            }
       $("#dateMonth").html(monthHTML);
        }
    
    for(i=1; i<=31; i++){
        if(i<10){
            dayHTML += "<option value='0"+i+"'> 0" + i +"</option>";
        } else {
            dayHTML += "<option value='"+i+"'>" + i +"</option>";  
        }
        $("#dateDay").html(dayHTML);
    }
}

DynamicallyMakeTimeSlots();