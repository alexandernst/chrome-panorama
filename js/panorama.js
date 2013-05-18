$(document).ready(function(){
	console.log("I'm alive!!!");

	$("#panorama-view").resizable({
		handles: "n, e, s, w, ne, se, sw, nw"
	});

	chrome.storage.onChanged.addListener(function(changes, namespace){
		showTabs();
	});

	showTabs();

});

function showTabs(){

	chrome.storage.local.get("tabs", function(data){
		console.log(data);
		$('#panorama-view').text(JSON.stringify(data));
	});

}