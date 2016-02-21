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
    var flux = {
        '"city"': $("#city").val(),
        '"venue"': $("#venue").val(),
        '"address"': $("#address").val(),
        '"geocode"': [
         $("#latitude").val(), $("#longitude").val()
        ],
        '"date"': $("#date").val(),
        '"doorsOpenTime"': $("#doorsOpenTime").val(),
        '"startTime"': $("#startTime").val(),
        '"endTime"': $("#endTime").val(),
        '"hosts"': [{
            '"name"': $("#hostName").val(),
            '"url"': $("#hostURL").val()
        }],
        '"signupURL"': $("#signUpUrl").val(),
        '"checkInCode"': $("#checkInCode").val(),
        '"_id"': $("#_id").val()
    }

    $.post("http://fluxdelux.org/events/create", flux)



    .done(function () {
        alert("second success");
        })

    .fail(function () {
        alert("error");
        })
     .always(function () {
        alert("finished");
        });




};