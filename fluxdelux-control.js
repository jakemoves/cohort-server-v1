var chControlBoard = {
	url: "/broadcast",
	postdata: "",
	validateCue : function(){
		console.log("checking cue validity");
		postData = 'episode' + '-' + $('#control-episode').val() + '-' + $('#control-action').val();
		console.log(postData);
	}
}

var arm = function(){
	chControlBoard.validateCue();
	$('#control-arm').hide();
	$('#control-episode, #control-action').prop('disabled', 'disabled');
	$('#fire-cancel-buttons').show();
}

var disarm = function(){
	$('#fire-cancel-buttons').hide();
	$('#control-episode, #control-action').prop('disabled', false);
	$('#control-arm').show();
}

var fire = function(){
	var data = { "action" : chControlBoard.postData};
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