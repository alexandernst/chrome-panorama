/*
TODO

* listen when each tab is activated and capture it (thumb)
* listen for events for new windows/tabs
* listen for events for closed windows/tabs, but make sure not to trigger if chrome is closing
* listen for runtime.onSuspend

*/

chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.create({
		url: chrome.extension.getURL("panorama.html")
	});    
});

chrome.alarms.create("auto-save", {
	when: 1,
	periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm){
	if(alarm.name == "auto-save"){
		saveCurrentTabs();
	}
});

/*
1.		Get the current saved data (saved windows/tabs)

1.1.	If there isn't any, create an array, which will then
		have the following structure:
		[
			{
				window: { <window-relative data>},
				tabs: [
					{ <tab-relative data>},
					{ <tab-relative data>}
				]
			},

			{
				window: { <window-relative data>},
				tabs: [
					{ <tab-relative data>},
					{ <tab-relative data>}
				]
			}
		]

1.2.	If there is, it already has the structure of 1.1. so just
		strip the data of "real" windows.
		A "real" window is a window which is currently opened,
		no matter what state is has (maximized, minimized, etc...).

2.		Get the "real" windows and all the data they contain (position,
		size, tabs, etc...)

3.		Merge the data from 2. with the data from 1.x and save it.
*/

var windows_collection = new WindowsCollection();

function saveCurrentTabs(){

	chrome.windows.getAll(function(windows){

		//Get only normal windows
		windows = _.filter(windows, function(w){
			return w.type == "normal";
		});


		//Get already saved data or create new data structure
		windows_collection.fetch({
			success: function(collection, response, options){

				_.each(windows_collection.where({real: true}), function(window_model){
					window_model.destroy();
				});

				//Get tabs of each window
				_.each(windows, function(w){

					var window_model = new WindowModel(w);
					window_model.set("real", true);

					var tabs_collection = new TabsCollection();

					//Query all tabs in this window
					chrome.tabs.query({
						windowId: w.id
					}, function(tabs){

						_.each(tabs, function(tab){
							//Exclude the tab of this plugin
							if(tab.url == chrome.extension.getURL("panorama.html")){
								return;
							}

							var tab_model = new TabModel(tab);
							tabs_collection.push(tab_model);

						});

						window_model.set("tabs", tabs_collection);
						windows_collection.push(window_model);
						window_model.save();

					});

				});

			},

			error: function(collection, response, options){
				console.log("Something bad happened!", response);
			}

		});

	});

}