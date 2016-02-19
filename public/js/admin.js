var eventsCounter = 1;




function FluxEvent(city, venue, address, geocode, date, doorsOpenTime, startTime, endTime, hosts, singupURL, checkInCode, _id){
    
    this.city = city;
    this.venue = venue;
    this.address = address;
    this.geocode = geocode;
    this.date = date;
    this.doorsOpenTime =doorsOpenTime;
    this.startTime = startTime;
    this.endTime = endTime;
    this.hosts = hosts;
    this.signupURL = singupURL;
    this.checkInCode = checkInCode;
    this._id = _id;
};


function formSubmit(){
    
    City = $("#city").val();
    
     var Flux = new FluxEvent($("#city").val(),$("#venue").val(),$("#address").val(),[$("#latitude").val(),$("#longitude").val()
     ],$("#date").val(),$("#doorsOpenTime").val(),$("#startTime").val(),$("#endTime").val(),[{
        "name": $("#hostName").val(),
        "url": $("#hostURL").val()
    }],$("#signUpUrl").val(), $("#checkInCode").val(), $("#_id").val() );
    
     
   eventsCounter += 1; 
    
}

  