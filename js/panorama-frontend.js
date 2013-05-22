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

			var current_w = $(_.last($('#windows-view .window')));

			current_w.find('.badge').tooltip({
				title: function(){
					var w_info = "";
					_.each(w.window, function(v, k){
						w_info += k + ": " + v + "<br>";
					});
					return w_info;
				},
				html: true,
				placement: "bottom"
			});

		});

		_.each($("#windows-view .thumbnails"), function(thumbnails){
			$(thumbnails).resizable();
		});

	});

}