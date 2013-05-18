$(document).ready(function(){
	chrome.storage.onChanged.addListener(function(changes, namespace){
		showTabs();
	});

	showTabs();
});

function showTabs(){

	chrome.storage.local.get("panorama", function(data){

		$('#panorama-view :not(.ui-resizable-handle)').remove();

		data = data.panorama;

		_.each(data, function(w){

			$('#panorama-view').append(
				_.template( _.unescape( $('#w_tpl').html() ), {
					w_info: w
				})
			);

		});

	});

}