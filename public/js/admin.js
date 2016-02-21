//--Variable to use in menu value
var eventsCounter = 0;

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
        success: function(data){ 
            console.log("post request successful");
            console.log(data);
        },
        error: function(data){
            console.log('error: ');
            console.log(data);
        }
    });
};