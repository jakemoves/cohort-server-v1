var dancerName;
switch($('#control-episode').val()){
    case 0: dancerName = "troy";
    break;
    case 1: dancerName = "Luke";
    break;
    case 2: dancerName = "BrentJenna";
    break;
    case 3: dancerName = "Dedra";
    break;
    case 4: dancerName = "Anisa";
    break;
    case 5: dancerName = "Apolonia";
    break;
    default: dancerName = " ";
    
}


var chControlBoard = {
	url: "http://cohortserver-pillarapp.herokuapp.com/broadcast",
	postdata: "",
	validateCue : function(){
		console.log("checking cue validity");
		chControlBoard.postData =  dancerName + '-' + "go";
	}
}

//var arm = function(){
//	chControlBoard.validateCue();
//	$('#control-arm').hide();
//	$('#control-episode, #control-action').prop('disabled', 'disabled');
//	$('#fire-cancel-buttons').show();
//}
//
//var disarm = function(){
//	$('#fire-cancel-buttons').hide();
//	$('#control-episode, #control-action').prop('disabled', false);
//	$('#control-arm').show();
//}

var fire = function(){
	console.log(chControlBoard.postData);
	var data = { "action" : chControlBoard.postData};
	//console.log(data);
	$.ajax({
		method: "POST",
		url: chControlBoard.url,
		processData: false,
		contentType: 'application/json',
		data: JSON.stringify(data)
	}).done(function(msg){
		console.log("cue broadcast successful");
	}).fail(function(msg){
		console.log("cue broadcast unsuccessful");
	}).always(function(msg){
		console.log(msg);
		$('#server-response').html(JSON.stringify(msg));
	});

	// $.post(chControlBoard.url, function(chControlBoard.postData){
	// 	$('#server-response').html(data);
	// });
	$('#fire-cancel-buttons').hide();
	$('#control-episode, #control-action').prop('disabled', false);
	$('#control-arm').show();
}