chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.create({
		url: chrome.extension.getURL("panorama.html")
	});    
});

//listen for events for new windows/tabs
//listen for events for closed windows/tabs
//listen for runtime.onSuspend

chrome.alarms.create("auto-save", {
	when: 1,
	periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm){
	if(alarm.name == "auto-save"){
		saveCurrentTabs();
	}
});

function saveCurrentTabs(){
	console.log("save current tabs!");

	chrome.windows.getAll(function(windows){

		var data = [];

		//Get only normal windows
		windows = _.filter(windows, function(w){
			return w.type == "normal";
		});

		//Get tabs of each window
		_.each(windows, function(w){

			var wdata = [];

			chrome.tabs.query({
				windowId: w.id
			}, function(tabs){

				_.each(tabs, function(tab){

					if(tab.url != chrome.extension.getURL("panorama.html")){
						var tabdata = {};
						tabdata.pinned = tab.pinned;
						tabdata.active = tab.active;
						tabdata.url = tab.url;
						tabdata.title = tab.title;
						tabdata.favIconUrl = tab.favIconUrl;
						tabdata.incognito = tab.incognito;
						wdata.push(tabdata);
					}

				});

				data.push(wdata);

				console.log(data);
				chrome.storage.local.set({
					'tabs': data
				});

			});

		});

	});

}