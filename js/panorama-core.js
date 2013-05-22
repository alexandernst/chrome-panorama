/*
TODO

* listen when each tab is activated and capture it (thumb)
* listen for events for new windows/tabs
* listen for events for closed windows/tabs
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

function saveCurrentTabs(){

	chrome.windows.getAll(function(windows){

		chrome.storage.local.get("panorama", function(data){

			//Get already saved data or create new data structure
			if(_.isEmpty(data)){
				data = [];
			}else{
				data = _.filter(data, function(w){
					w.real = false;
				});
			}

			//Get only normal windows
			windows = _.filter(windows, function(w){
				return w.type == "normal";
			});

			var n_windows = _.size(windows);
			var n_saved_windows = 0;

			//Get tabs of each window
			_.each(windows, function(w){

				var wdata = {};

				wdata.window = {};
				wdata.tabs = [];

				//Save window information
				wdata.window.real = true; //hack (see comments)
				wdata.window.left = w.left;
				wdata.window.top = w.top;
				wdata.window.width = w.width;
				wdata.window.height = w.height;
				wdata.window.incognito = w.incognito;

				//Query all tabs in this window
				chrome.tabs.query({
					windowId: w.id
				}, function(tabs){

					_.each(tabs, function(tab){

						//Exclude the tab of this plugin
						if(tab.url == chrome.extension.getURL("panorama.html")){
							return;
						}

						//Save tab information
						var tabdata = {};
						tabdata.pinned = tab.pinned;
						tabdata.active = tab.active;
						tabdata.url = tab.url;
						tabdata.title = tab.title;
						tabdata.favIconUrl = tab.favIconUrl;
						tabdata.incognito = tab.incognito;
						wdata.tabs.push(tabdata);

					});

					data.push(wdata);

					n_saved_windows++;

					if(n_windows == n_saved_windows){
						chrome.storage.local.set({
							'panorama': data
						});
					}

				});

			});

		});

	});

}