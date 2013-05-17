$(document).ready(function(){
	console.log("I'm alive!!!");

	$("#panorama-view").resizable({
		handles: "n, e, s, w, ne, se, sw, nw"
	});

	chrome.windows.getAll(function(windows){

		//Get only normal windows
		windows = _.filter(windows, function(w){
			return w.type == "normal";
		});

		console.log(windows);

		//Get tabs of each window
		_.each(windows, function(w){

			chrome.tabs.query({
				windowId: w.id
			}, function(tabs){

				_.each(tabs, function(tab){
					console.log(tab.url);
				});

			});
		});

	});

});