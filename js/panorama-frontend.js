var pnrm_data = new PanoramaCollection();
var pnrm_view = new PanoramaView({
	collection: pnrm_data
});

function renderData(){
	chrome.storage.local.get("panorama", function(data){

		//this works
		pnrm_data.reset(data.panorama);  // <--- works fine, but ugly

		//doesn't work, but it's the right way of doing it
		//pnrm_data.fetch().then(function(collection, response, options){
		//	console.log(collection); // <-- prints empty array
		//	console.log("ok");
		//},function(collection, response, options){
		//	console.log("ko");
		//});

	});
}

$(document).ready(function(){
	pnrm_view.render();
	$("#tree").html(pnrm_view.el);

	renderData();

	chrome.storage.onChanged.addListener(function(changes, namespace){
		renderData();
	});
});