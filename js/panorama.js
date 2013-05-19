$(document).ready(function(){
	chrome.storage.onChanged.addListener(function(changes, namespace){
		showTabs();
	});

	showTabs();
});

function showTabs(){

	chrome.storage.local.get("panorama", function(data){

		$('#windows-view').empty();

		data = data.panorama;

		_.each(data, function(w){

			$('#windows-view').append(
				_.template( _.unescape( $('#w_tpl').html() ), {
					w_info: w
				})
			);

			_.each($("#windows-view .thumbnails"), function(thumbnails){
				$(thumbnails).resizable();
			});

		});

	});

}