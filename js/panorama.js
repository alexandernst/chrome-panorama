$(document).ready(function(){
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

		$('#panorama-view :not(.ui-resizable-handle)').remove();

		_.each(data, function(w){

			if(_.isArray(w) && _.size(w) == 1){	//for some reason we
				w = _.first(w);					//get an array for data
			}									//instead of data itself

			$('#panorama-view').append(
				_.template( _.unescape( $('#w_tpl').html() ), {
					tabs: w.tabs
				})
			);

		});

	});

}