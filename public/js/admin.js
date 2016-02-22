//function FluxEvent(city, venue, address, geocode, date, doorsOpenTime, startTime, endTime, hosts, singupURL, checkInCode, _id){
//    
//    this.city = city;
//    this.venue = venue;
//    this.address = address;
//    this.geocode = geocode;
//    this.date = date;
//    this.doorsOpenTime =doorsOpenTime;
//    this.startTime = startTime;
//    this.endTime = endTime;
//    this.hosts = hosts;
//    this.signupURL = singupURL;
//    this.checkInCode = checkInCode;
//    this._id = _id;
//};

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
            console.log("post request successful");
            console.log(data);
        },
        error: function (data) {
            console.log('error: ');
            console.log(data);
        }
    });
};

$(document).ready(function () {
    var events = $.get("http://fluxdelux.org/events")
        .done(function (data) {
        //console.log(data);
        })
        .fail(function () {
        console.log("Request failed: /dropDownEvents");
        });

        events.then(function (events) {
            var eventsId =[];
            for (i = 0; i <= events.length; i++) {
                var eventHTML = '<option value ="' + i + '">' + events[i].city + ' ' + events[i].venue + ' ' + events[i].date + '</option>';
                $('#deleteEvent').append($(eventHTML));
                
                eventsId.push(events[i]._id);
                console.log(eventsId);
                
                
            }
        });
   ;
});